import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { services } from '@/lib/services-data';

export default function HomeServices() {
  return (
    <section className="my-8 bg-card p-4 rounded-2xl shadow-md">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-headline font-bold">سرویس‌های نیاز روز</h2>
        <Link href="/services">
          <Button variant="link" className="text-primary">مشاهده همه</Button>
        </Link>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.slice(0, 4).map((service) => (
          <figure key={service.slug} className="flex items-start sm:items-center gap-4 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-lg">
            <div className="relative flex-shrink-0 h-20 w-20">
              <Image src={service.image} alt={service.title} fill className="object-contain" />
            </div>
            <figcaption className="flex flex-col justify-between h-full">
              <div>
                <p className="font-body text-sm text-muted-foreground">
                  <Link href={service.href} className="font-bold text-foreground text-base hover:text-primary transition-colors">{service.title}</Link>
                  <span className="block mt-1" dangerouslySetInnerHTML={{ __html: service.description_short }} />
                </p>
              </div>
              <Link href={service.href}>
                 <Button variant="link" size="sm" className="text-primary self-start px-0 mt-2">اطلاعات بیشتر</Button>
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
