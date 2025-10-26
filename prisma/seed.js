import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test categories
  const electronics = await prisma.category.create({
    data: {
      name: 'الکترونیک',
    },
  });

  const realEstate = await prisma.category.create({
    data: {
      name: 'املاک',
    },
  });

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'کاربر تست',
      phone: '09123456789',
      profile: {
        create: {
          city: 'تهران',
          bio: 'این یک پروفایل تست است',
        },
      },
    },
  });

  // Create some test listings
  await prisma.listing.create({
    data: {
      title: 'گوشی آیفون 13 نو',
      description: 'گوشی آیفون 13 نو با گارانتی',
      price: 45000000,
      currency: 'IRR',
      city: 'تهران',
      userId: user.id,
      categoryId: electronics.id,
      images: {
        create: [
          {
            url: 'https://example.com/iphone13.jpg',
            order: 1,
          },
        ],
      },
    },
  });

  await prisma.listing.create({
    data: {
      title: 'آپارتمان 80 متری',
      description: 'آپارتمان نوساز 80 متری در تهرانپارس',
      price: 2500000000,
      currency: 'IRR',
      city: 'تهران',
      userId: user.id,
      categoryId: realEstate.id,
      lat: 35.7219,
      lng: 51.3347,
    },
  });

  console.log('داده‌های نمونه با موفقیت وارد شدند ✅');
}

main()
  .catch((e) => {
    console.error('خطا در وارد کردن داده‌های نمونه:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });