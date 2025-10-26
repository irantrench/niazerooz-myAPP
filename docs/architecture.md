# معماری پروژه (Architecture)

این پروژه به صورت ماژولار و میکروسرویس-مانند طراحی شده است، اما در محیط توسعه به‌صورت مونولیت محلی با سرویس‌های وابسته اجرا می‌شود.

اجزا:

- Frontend (niazerooz-myAPP)
  - Next.js (App Router)
  - Apollo Client برای ارتباط با Hasura (GraphQL)
  - TailwindCSS برای استایل

- Admin Panel (niazerooz-admin)
  - Next.js جداگانه برای پنل ادمین
  - Apollo Client برای کوئری‌های مدیریتی

- Backend / Data
  - Hasura GraphQL Engine — جلوی دیتابیس PostgreSQL را می‌گیرد و endpoint GraphQL ارائه می‌دهد
  - PostgreSQL — دیتابیس اصلی
  - Prisma — ORM (schema و مایگریشن محلی)

- Storage
  - MinIO — ذخیره‌سازی فایل مشابه S3 در لوکال

- ابزارها و خدمات جانبی
  - pgAdmin — مدیریت دیتابیس از طریق UI
  - Docker Compose — برای راه‌اندازی سرویس‌های توسعه (Postgres, Hasura, MinIO, pgAdmin)

داده‌ها و فلو:

- اپ‌های فرانت‌اند کوئری‌ها/موتاسیون‌های GraphQL را به Hasura می‌فرستند.
- Hasura با استفاده از مجوز Admin/Role-based به PostgreSQL دسترسی دارد.
- Prisma برای توسعه و script‌-های مایگریشن استفاده می‌شود؛ پس از تثبیت اسکیمای Prisma مایگریشن‌ها به دیتابیس اعمال می‌شوند.

امنیت و احراز هویت (مبهم‌سازی)

- Hasura با مقدار `HASURA_GRAPHQL_ADMIN_SECRET` محافظت می‌شود.
- احراز هویتِ کاربر در اپ‌ها می‌تواند با JWT انجام شود؛ tokenها را Hasura می‌پذیرد و نقش‌ها را از claimهای JWT استخراج می‌کند.

نکات توسعه

- برای توسعه محلی، همه سرویس‌ها توسط `docker-compose.yml` در ریشه راه‌اندازی می‌شوند.
- مایگریشن Prisma را فقط پس از بررسی اسکیمای `prisma/schema.prisma` اجرا کنید.
