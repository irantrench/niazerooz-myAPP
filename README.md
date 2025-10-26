# niazerooz-myAPP

پروژهٔ «نیازروز» — اپلیکیشن آگهی‌ها با پنل مدیریت، مهاجرت از Firebase به Hasura/Postgres و ساختار مدرن با Next.js

این مخزن شامل:
- اپلیکیشن جلویی (Next.js) — مسیر: `niazerooz-myAPP`
- پنل مدیریت جدا (Next.js) — مسیر: `niazerooz-admin`
- پیکربندی Docker Compose برای Postgres، Hasura، pgAdmin و MinIO
- اسکیمای Prisma و مایگریشن‌ها
- اسکریپت‌ها و مستندات مهاجرت از Firebase

اهداف این مستند
- شرح ساختار پروژه و اجزای آن
- راهنمای راه‌اندازی محیط توسعه محلی
- رویهٔ مهاجرت داده از Firebase به Postgres/Hasura
- راهنمای مشارکت، تست و انتشار

برای شروع سریع (محلی):

1. نصب وابستگی‌ها در هر دو اپ:

```bash
cd /home/irantrench/my-app/niazerooz-myAPP
npm install
cd ../niazerooz-admin
npm install
```

2. راه‌اندازی سرویس‌های پشتیبانی (Postgres, Hasura, MinIO, pgAdmin):

```bash
cd /home/irantrench/my-app/niazerooz-myAPP
docker-compose up -d
```

3. اجرای اپ‌ها در حالت توسعه:

```bash
# اپ اصلی
cd /home/irantrench/my-app/niazerooz-myAPP && npm run dev
# پنل مدیریت
cd /home/irantrench/my-app/niazerooz-admin && npm run dev
```

فایل‌های مستنداتی بیشتر در پوشه `docs/` قرار دارند (راهنمای نصب، معماری و مهاجرت).

اگر می‌خواهید این تغییرات را به GitHub ارسال (push) کنید، اطمینان حاصل کنید که احراز هویت Git شما تنظیم است (SSH key یا cache شده برای HTTPS):

```bash
cd /home/irantrench/my-app/niazerooz-myAPP
git add .
git commit -m "chore(docs): add project documentation"
git push origin main
```

در صورتی که push با خطا مواجه شد، خطای کامل را برای من بفرستید تا کمک کنم.
