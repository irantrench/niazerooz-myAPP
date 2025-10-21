
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/lib/services-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-4xl font-headline font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div 
                    className="prose prose-invert prose-p:text-muted-foreground prose-li:text-muted-foreground prose-headings:text-foreground prose-strong:text-primary-foreground space-y-4"
                    dangerouslySetInnerHTML={{ __html: service.description_full }} 
                    />
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="w-full">
                            <CheckCircle className="ml-2 h-5 w-5" />
                            همین حالا فعال کنید
                        </Button>
                         <Link href="/services" className="w-full">
                            <Button size="lg" variant="outline" className="w-full">
                                <ArrowLeft className="ml-2 h-5 w-5" />
                                بازگشت به سرویس‌ها
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </div>
            <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">
                 <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-12 bg-gray-100 dark:bg-gray-900/40"
                  />
            </div>
        </div>
      </Card>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'سرویس یافت نشد',
    };
  }

  return {
    title: `سرویس ${service.title} | نیاز روز`,
    description: service.description_short.replace(/<[^>]+>/g, ''), // Remove HTML tags for meta description
  };
}
