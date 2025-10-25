'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import type { Ad, UserProfile } from '@/lib/types';
import { Loader2, User, Clock, Tag, MapPin, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function ListingDetailPage() {
  const params = useParams();
  const { id } = params;
  const [listing, setListing] = useState<Ad | null>(null);
  const [author, setAuthor] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchListing = async () => {
      if (typeof id !== 'string') {
          setLoading(false);
          return;
      }
      
      setLoading(true);
      try {
        const docRef = doc(db, 'ads', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const adData = { id: docSnap.id, ...docSnap.data() } as Ad;
          setListing(adData);

          // Fetch author info
          const userRef = doc(db, 'users', adData.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setAuthor(userSnap.data() as UserProfile);
          }

        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "مشکلی در دریافت اطلاعات آگهی پیش آمده است.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!listing) {
    return notFound();
  }

  const getPriceDisplay = (listing: Ad) => {
    if (listing.priceType === 'free') return 'رایگان';
    if (listing.priceType === 'negotiable') return 'توافقی';
    if (listing.priceType === 'fixed' && listing.price) {
        return `${listing.price.toLocaleString('fa-IR')} تومان`;
    }
    return 'نامشخص';
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

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Carousel */}
          <Card className="overflow-hidden">
             {listing.images && listing.images.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {listing.images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video">
                          <Image src={img} alt={`${listing.title} - تصویر ${index + 1}`} fill className="object-contain" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                   {listing.images.length > 1 && (
                     <>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                     </>
                   )}
                </Carousel>
             ) : (
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <Image src="https://picsum.photos/seed/ad-placeholder/800/450" alt="بدون تصویر" fill className="object-cover" />
                </div>
             )}
          </Card>

          {/* Ad Details */}
          <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-3xl font-headline font-bold">{listing.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{getTimeAgo(listing.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Tag className="w-4 h-4" />
                                <span>{listing.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{listing.location || 'نامشخص'}</span>
                            </div>
                        </div>
                    </div>
                     <p className="text-2xl font-bold text-primary whitespace-nowrap">{getPriceDisplay(listing)}</p>
                </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">توضیحات</h3>
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5"/>
                        اطلاعات فروشنده
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarImage src={author?.photoURL || ''} alt={author?.displayName || 'فروشنده'} />
                        <AvatarFallback>{author?.displayName?.charAt(0) || '؟'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-lg">{author?.displayName || 'کاربر نیاز روز'}</p>
                        <p className="text-sm text-muted-foreground">عضو از {author?.createdAt ? new Date((author.createdAt as any).seconds * 1000).toLocaleDateString('fa-IR') : 'نامشخص'}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" size="lg">
                        <Phone className="w-5 h-5 ml-2"/>
                        نمایش اطلاعات تماس
                    </Button>
                     <Button className="w-full" size="lg" variant="outline">
                        <MessageSquare className="w-5 h-5 ml-2"/>
                        ارسال پیام
                    </Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">توصیه‌های ایمنی</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>از پرداخت وجه به صورت مستقیم و قبل از دریافت کالا خودداری کنید.</p>
                    <p>در مکان‌های عمومی و امن قرار ملاقات بگذارید.</p>
                    <p>هرگز مشخصات بانکی خود را برای دیگران ارسال نکنید.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
