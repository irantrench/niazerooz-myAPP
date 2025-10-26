import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

// Initialize Firebase Admin
const serviceAccount = require("../firebase-service-account.json");
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();
const prisma = new PrismaClient();

async function migrateUsers() {
  console.log("🔄 شروع مهاجرت کاربران...");
  
  try {
    // دریافت همه کاربران از Firebase Auth
    const { users } = await auth.listUsers();
    
    for (const user of users) {
      // هش کردن پسورد موقت
      const hashedPassword = await hash("ChangeMe123!", 10);
      
      // ایجاد کاربر در دیتابیس جدید
      const newUser = await prisma.user.create({
        data: {
          id: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          phone: user.phoneNumber || "",
          password: hashedPassword,
          role: "user",
          status: "active",
          profile: {
            create: {
              avatar_url: user.photoURL || "",
            },
          },
        },
      });
      
      console.log(`✅ کاربر منتقل شد: ${newUser.email}`);
    }
    
    console.log("✅ مهاجرت کاربران با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در مهاجرت کاربران:", error);
    throw error;
  }
}

async function migrateListings() {
  console.log("🔄 شروع مهاجرت آگهی‌ها...");
  
  try {
    const listings = await db.collection("listings").get();
    
    for (const doc of listings.docs) {
      const data = doc.data();
      
      // ایجاد آگهی در دیتابیس جدید
      const newListing = await prisma.listing.create({
        data: {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          price: data.price || 0,
          city: data.city || "",
          status: "pending",
          user: {
            connect: {
              id: data.userId,
            },
          },
          category: {
            connect: {
              id: data.categoryId,
            },
          },
          images: {
            create: data.images?.map((url: string) => ({
              url,
            })) || [],
          },
        },
      });
      
      console.log(`✅ آگهی منتقل شد: ${newListing.title}`);
    }
    
    console.log("✅ مهاجرت آگهی‌ها با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در مهاجرت آگهی‌ها:", error);
    throw error;
  }
}

async function migrateCategories() {
  console.log("🔄 شروع مهاجرت دسته‌بندی‌ها...");
  
  try {
    const categories = await db.collection("categories").get();
    
    // اول دسته‌بندی‌های اصلی
    for (const doc of categories.docs) {
      const data = doc.data();
      if (!data.parentId) {
        await prisma.category.create({
          data: {
            id: doc.id,
            name: data.name,
            slug: data.slug,
            order: data.order || 0,
            level: 1,
          },
        });
      }
    }
    
    // سپس زیردسته‌ها
    for (const doc of categories.docs) {
      const data = doc.data();
      if (data.parentId) {
        await prisma.category.create({
          data: {
            id: doc.id,
            name: data.name,
            slug: data.slug,
            order: data.order || 0,
            level: 2,
            parent: {
              connect: {
                id: data.parentId,
              },
            },
          },
        });
      }
    }
    
    console.log("✅ مهاجرت دسته‌بندی‌ها با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در مهاجرت دسته‌بندی‌ها:", error);
    throw error;
  }
}

async function migrateMessages() {
  console.log("🔄 شروع مهاجرت پیام‌ها...");
  
  try {
    const messages = await db.collection("messages").get();
    
    for (const doc of messages.docs) {
      const data = doc.data();
      
      await prisma.message.create({
        data: {
          id: doc.id,
          content: data.content || "",
          listing: {
            connect: {
              id: data.listingId,
            },
          },
          sender: {
            connect: {
              id: data.senderId,
            },
          },
          receiver: {
            connect: {
              id: data.receiverId,
            },
          },
          status: "active",
        },
      });
    }
    
    console.log("✅ مهاجرت پیام‌ها با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در مهاجرت پیام‌ها:", error);
    throw error;
  }
}

async function migrateReports() {
  console.log("🔄 شروع مهاجرت گزارش‌ها...");
  
  try {
    const reports = await db.collection("reports").get();
    
    for (const doc of reports.docs) {
      const data = doc.data();
      
      await prisma.report.create({
        data: {
          id: doc.id,
          type: data.type || "other",
          description: data.description || "",
          status: "pending",
          listing: {
            connect: {
              id: data.listingId,
            },
          },
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      });
    }
    
    console.log("✅ مهاجرت گزارش‌ها با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در مهاجرت گزارش‌ها:", error);
    throw error;
  }
}

async function migrate() {
  try {
    console.log("🚀 شروع فرآیند مهاجرت...");
    
    await migrateUsers();
    await migrateCategories();
    await migrateListings();
    await migrateMessages();
    await migrateReports();
    
    console.log("🎉 مهاجرت با موفقیت به پایان رسید");
  } catch (error) {
    console.error("❌ خطا در فرآیند مهاجرت:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();