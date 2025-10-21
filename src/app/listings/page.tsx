
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Filter } from 'lucide-react';
import type { Listing } from '@/lib/types';

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'فروش آپارتمان ۱۲۰ متری نوساز',
    price: '۵٬۲۰۰٬۰۰۰٬۰۰۰ تومان',
    location: 'تهران، سعادت آباد',
    image: {
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A modern apartment building in a bustling city.',
      hint: 'apartment building'
    },
    category: 'املاک',
    timestamp: 'لحظاتی پیش',
  },
  {
    id: '2',
    title: 'خودروی پژو پارس مدل ۱۴۰۲',
    price: '۷۵۰٬۰۰۰٬۰۰۰ تومان',
    location: 'اصفهان، مرکز شهر',
     image: {
      src: 'https://images.unsplash.com/photo-1619409869401-446a06950267?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A clean, white modern car, a Peugeot Pars.',
      hint: 'white car'
    },
    category: 'وسایل نقلیه',
    timestamp: '۵ دقیقه پیش',
  },
  {
    id: '3',
    title: 'استخدام برنامه‌نویس React',
    price: 'توافقی',
    location: 'مشهد، احمدآباد',
    image: {
      src: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A person working on a laptop with code on the screen.',
      hint: 'developer job'
    },
    category: 'استخدام',
    timestamp: '۱ ساعت پیش',
  },
  {
    id: '4',
    title: 'مبل راحتی ۷ نفره در حد نو',
    price: '۱۵٬۰۰۰٬۰۰۰ تومان',
    location: 'شیراز، معالی‌آباد',
    image: {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A comfortable and modern living room sofa.',
      hint: 'modern sofa'
    },
    category: 'لوازم خانگی',
    timestamp: '۳ ساعت پیش',
  },
    {
    id: '5',
    title: 'تدریس خصوصی ریاضیات کنکور',
    price: 'تماس بگیرید',
    location: 'آنلاین',
    image: {
      src: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A person teaching or tutoring mathematics on a chalkboard.',
      hint: 'math tutoring'
    },
    category: 'آموزش',
    timestamp: 'دیروز',
  },
    {
    id: '6',
    title: 'واگذاری گربه پرشین',
    price: 'رایگان',
    location: 'کرج، گوهردشت',
    image: {
      src: 'https://images.unsplash.com/photo-1574158622682-e40e69841006?q=80&w=800&auto=format&fit=crop',
      width: 800,
      height: 600,
      alt: 'A cute Persian cat looking at the camera.',
      hint: 'persian cat'
    },
    category: 'حیوانات',
    timestamp: 'دیروز',
  },
];

export default function ListingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-headline">آگهی‌های اخیر</h1>
        <Button variant="outline">
          <Filter className="w-4 h-4 ml-2" />
          فیلترها
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden group">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={listing.image.src}
                  alt={listing.image.alt}
                  width={listing.image.width}
                  height={listing.image.height}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={listing.image.hint}
                />
                 <Badge className="absolute top-2 right-2" variant={listing.price === 'رایگان' ? 'destructive' : 'default'}>{listing.category}</Badge>
                 <Button size="icon" variant="ghost" className="absolute top-1 left-1 bg-black/30 hover:bg-black/60 text-white rounded-full">
                    <Heart className="w-5 h-5"/>
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">{listing.location}</p>
                <CardTitle className="text-base font-semibold h-12 leading-6">
                    <Link href="#" className="hover:text-primary transition-colors">
                        {listing.title}
                    </Link>
                </CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <p className="text-sm font-bold text-primary">{listing.price}</p>
                <p className="text-xs text-muted-foreground">{listing.timestamp}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-8 text-center">
          <Button variant="outline">مشاهده آگهی‌های بیشتر</Button>
       </div>
    </div>
  );
}
