# راهنمای نصب و راه‌اندازی (Local)

این فایل گام‌های لازم برای راه‌اندازی محیط توسعه محلی را توضیح می‌دهد.

## پیش‌نیازها

- Node.js >= 18
- npm
- Docker و Docker Compose (برای Postgres/Hasura/MinIO)
- Git

## مراحل

1. کلون مخزن و رفتن به پوشهٔ پروژه

```bash
git clone https://github.com/irantrench/niazerooz-myAPP.git
cd niazerooz-myAPP
```

2. راه‌اندازی سرویس‌های پشتیبان (Postgres, Hasura, MinIO, pgAdmin)

```bash
cd /home/irantrench/my-app/niazerooz-myAPP
docker-compose up -d
```

3. نصب وابستگی‌ها

```bash
# اپ اصلی
cd /home/irantrench/my-app/niazerooz-myAPP
npm install

# پنل مدیریت
cd /home/irantrench/my-app/niazerooz-admin
npm install
```

4. تنظیم متغیرهای محیطی

فایل `.env` و `.env.local` در هر پروژه را با مقادیر مناسب پر کنید. نمونه‌ها در ریشهٔ هر پروژه وجود دارند یا در `docs/` توضیح داده شده‌اند.

5. اجرای اپ‌ها

```bash
# اپ اصلی
cd /home/irantrench/my-app/niazerooz-myAPP && npm run dev

# پنل مدیریت
cd /home/irantrench/my-app/niazerooz-admin && npm run dev
```

6. مایگریشن‌های Prisma (در صورت تغییر schema/prisma)

```bash
cd /home/irantrench/my-app/niazerooz-myAPP
npx prisma migrate dev --name init
```

## آدرس‌های مفید

- اپ اصلی: http://localhost:9002
- پنل مدیریت: http://localhost:9003
- Hasura Console: http://localhost:8080/console
- pgAdmin: http://localhost:8081
- MinIO Console: http://localhost:9000
