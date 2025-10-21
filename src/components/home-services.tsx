import Image from 'next/image';
import { Button } from './ui/button';

const services = [
  {
    title: "سرویس ستاره",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/star-v2.png",
    description: "بهترین انتخابه، اگه دوست دارید <strong>بالاتر از آگهی‌های عادی</strong> قرار بگیرید و <strong>بازدید آگهی</strong>‌هاتون رو بیشتر کنید.",
  },
  {
    title: "سرویس بروزرسانی",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/express-v2.png",
    description: "با <strong>سرویس بروزرسانی</strong> آگهی‌هاتون <strong>در طول شبانه‌روز</strong> به صورت <strong>اتوماتیک</strong> بروز می‌شن بدون اینکه خودتون وقت بذارید! <strong>رقابت</strong> آگهی‌های ستاره‌دار هم بر اساس بروزرسانی هست.",
  },
  {
    title: "سرویس چند شهری",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/region-v2.png",
    description: "با <strong>سرویس چند شهری</strong> می‌شه لذت <strong>فروش در</strong> <span class='text-justify block'><strong>سراسر ایران</strong> رو تجربه کرد!</span> اگه امکان ارسال محصول یا ارائه خدمات به <strong>کل کشور</strong> رو دارید، این سرویس رو از دست ندید.",
  },
  {
    title: "سرویس VIP",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/vip-v2.png",
    description: "<strong>سرویس VIP</strong> بهترین گزینه برای <strong>بالانشین شدن انحصاری</strong> در صفحه گروه کاری یا هر صفحه مرتبط با کسب و کار شماست.",
  }
];

export default function HomeServices() {
  return (
    <section className="my-8 bg-card p-4 rounded-2xl shadow-md">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-headline font-bold">سرویس‌های نیاز روز</h2>
        <Button variant="link" className="text-primary">مشاهده همه</Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <figure key={index} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="relative flex-shrink-0 h-20 w-20">
              <Image src={service.image} alt={service.title} fill className="object-contain" />
            </div>
            <figcaption className="flex flex-col justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">
                  <span className="font-bold text-foreground text-base">{service.title}</span>
                  <span dangerouslySetInnerHTML={{ __html: service.description.replace(service.title, '') }} />
                </p>
              </div>
               <Button variant="link" size="sm" className="text-primary self-start px-0">اطلاعات بیشتر</Button>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
