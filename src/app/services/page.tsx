
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/services-data';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-foreground">سرویس‌های ویژه نیاز روز</h1>
        <p className="text-lg text-muted-foreground mt-2">با سرویس‌های ما، بیشتر دیده شوید و سریع‌تر بفروشید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={service.slug} className="bg-card overflow-hidden group transition-all duration-300 hover:shadow-deep-lg hover:-translate-y-1 gradient-border flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-56 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={200}
                  height={200}
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
                 <Badge className="absolute top-4 left-4" variant={service.slug === 'vip' ? 'destructive' : 'default'}>{service.slug === 'vip' ? 'ویژه برندها' : 'افزایش بازدید'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-4">
                    <Link href={service.href} className="hover:text-primary transition-colors">
                        {service.title}
                    </Link>
                </CardTitle>
                <div 
                  className="text-sm text-muted-foreground space-y-2 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: service.description_short }}
                />
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Link href={service.href} className="w-full">
                    <Button className="w-full">
                        اطلاعات بیشتر و فعال‌سازی
                        <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
