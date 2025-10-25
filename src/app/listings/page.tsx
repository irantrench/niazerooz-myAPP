'use client';

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
import { Heart, Filter, Loader2 } from 'lucide-react';
import type { Ad } from '@/lib/types';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ListingsPage() {
  const [listings, setListings] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const listingsRef = collection(db, "ads");
        const q = query(listingsRef, orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
        setListings(ads);
      } catch (error) {
        console.error("Error fetching listings: ", error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری آگهی‌ها",
          description: "مشکلی در ارتباط با سرور پیش آمده است."
        })
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [toast]);
  
  const getPriceDisplay = (listing: Ad) => {
    if (listing.priceType === 'free') return 'رایگان';
    if (listing.priceType === 'negotiable') return 'توافقی';
    if (listing.priceType === 'fixed' && listing.price) {
        return `${listing.price.toLocaleString('fa-IR')} تومان`;
    }
    return 'تماس بگیرید';
  }
  
  const getTimeAgo = (timestamp: any) => {
    if (!timestamp?.seconds) return 'نامشخص';
    const now = new Date();
    const adDate = new Date(timestamp.seconds * 1000);
    const diffInSeconds = Math.floor((now.getTime() - adDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'لحظاتی پیش';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقیقه پیش`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعت پیش`;
    return adDate.toLocaleDateString('fa-IR');
  }


  if (loading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">آگهی‌های اخیر</h1>
        <Button variant="outline" className="shadow-sm border-white/20 hover:bg-primary/10 hover:text-primary">
          <Filter className="w-4 h-4 ml-2" />
          فیلترها
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <Card key={listing.id} className="bg-card overflow-hidden group transition-all duration-300 hover:shadow-deep-lg hover:-translate-y-1 gradient-border animate-subtle-float" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                 <Link href="#">
                    <Image
                      src={listing.images?.[0] || 'https://picsum.photos/seed/placeholder/800/600'}
                      alt={listing.title}
                      width={800}
                      height={600}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      data-ai-hint="ad image"
                    />
                 </Link>
                 <Badge className="absolute top-2 right-2 backdrop-blur-sm bg-black/50 text-white" variant={listing.priceType === 'free' ? 'destructive' : 'default'}>{listing.category}</Badge>
                 <Button size="icon" variant="ghost" className="absolute top-1 left-1 bg-black/30 hover:bg-primary text-white rounded-full transition-colors">
                    <Heart className="w-5 h-5"/>
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground">{listing.location || 'نامشخص'}</p>
                <CardTitle className="text-base font-semibold h-12 leading-6">
                    <Link href="#" className="hover:text-primary transition-colors">
                        {listing.title}
                    </Link>
                </CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <p className="text-base font-bold text-primary">{getPriceDisplay(listing)}</p>
                <p className="text-xs text-muted-foreground">{getTimeAgo(listing.createdAt)}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-8 text-center">
          <Button variant="outline" className="shadow-sm border-white/20 hover:bg-primary/10 hover:text-primary">مشاهده آگهی‌های بیشتر</Button>
       </div>
    </div>
  );
}
