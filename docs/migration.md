# راهنمای مهاجرت از Firebase (Firestore/Auth) به Hasura/Postgres

این سند یک نقشه راه کلی و مثال‌های عملی برای مهاجرت داده‌ها از Firestore و Firebase Auth به PostgreSQL/Hasura ارائه می‌دهد.

## مراحل کلی

1. آماده‌سازی
   - دسترسی به credentialهای Firebase Admin SDK (JSON service account) برای خواندن داده‌ها.
   - ساخت اسکیمای مقصد در Prisma/Hasura مطابق با داده‌های Firestore.

2. استخراج داده از Firestore
   - از Firebase Admin SDK استفاده کنید تا مجموعه‌ها (collections) و سندها را استخراج کنید.
   - داده‌ها را در فایل‌های JSON خروجی بگیرید (یا مستقیماً به دیتابیس مقصد بنویسید).

3. نگاشت فیلدها
   - نگاشت فیلدهای Firestore به ستون‌های PostgreSQL را مستند کنید. مثال:
     - `users` -> `users` (id, email, name, phone, createdAt)
     - `listings` -> `listings` (id, title, description, price, userId, createdAt)

4. درج داده در Postgres/Hasura
   - ساده‌ترین روش: استفاده از Prisma client یا pg client برای درج دسته‌ای (batch insert) داده‌ها.
   - قبل از وارد کردن، بررسی وجود مراجع (foreign keys) و درج در ترتیب صحیح ضروری است (مثلاً users قبل از listings).

5. احراز هویت
   - مهاجرت کاربرها از Firebase Auth: باید uidها/ایمیل‌ها را به جدول users منتقل کنید.
   - اگر از JWT سفارشی استفاده می‌کنید، می‌توانید claimهای لازم برای Hasura (مانند role و x-hasura-allowed-roles) را بسازید.

6. تست و اعتبارسنجی
   - بعد از واردسازی نمونه‌ای، با کوئری‌های Hasura داده‌ها را اعتبارسنجی کنید.
   - بررسی کنید که روابط، شاخص‌ها و محدودیت‌ها (constraints) درست اعمال شده باشند.

### اسکریپت نمونه (Node.js + Prisma)

در پوشه‌ی `scripts/` می‌توانید اسکریپت‌های مهاجرت قرار دهید. نمونهٔ ساده:

```js
// scripts/migrate-from-firebase.js (نمونه)
const admin = require('firebase-admin');
const { PrismaClient } = require('@prisma/client');

admin.initializeApp({ credential: admin.credential.cert(require('./fb-service-account.json')) });
const prisma = new PrismaClient();

async function migrateUsers() {
  const usersSnap = await admin.firestore().collection('users').get();
  for (const doc of usersSnap.docs) {
    const data = doc.data();
    await prisma.user.create({ data: {
      id: doc.id,
      email: data.email,
      name: data.displayName || null,
      phone: data.phoneNumber || null,
      createdAt: data.createdAt ? new Date(data.createdAt._seconds * 1000) : new Date()
    }});
  }
}

migrateUsers().then(() => prisma.$disconnect());
```

> نکته: قبل از اجرای اسکریپت‌های نوشته شده مستقیم روی دیتابیس اصلی، روی محیط staging یا دیتابیس محلی تست کنید.

### ملاحظات

- ترتیب درج رکوردها مهم است (parent قبل از child).
- اگر داده‌های زیادی دارید، از bulk insert یا batch و transaction استفاده کنید.
- مراقب محدودیت‌های سرعت (rate limits) در هنگام خواندن از Firestore باشید.

