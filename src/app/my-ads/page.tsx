'use client';

import Image from "next/image";
import { MoreHorizontal, PlusCircle, Trash2, FilePenLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/client";
import type { Ad } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function MyAdsPage() {
    const { user, loading: authLoading } = useAuth();
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchAds = async () => {
            if (!user) {
                setLoading(false);
                return;
            };

            setLoading(true);
            try {
                const q = query(collection(db, "ads"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const userAds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
                setAds(userAds);
            } catch (error) {
                console.error("Error fetching user ads: ", error);
                toast({ variant: 'destructive', title: 'خطا در دریافت آگهی‌ها', description: 'مشکلی در ارتباط با سرور پیش آمده است.' });
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchAds();
        }
    }, [user, authLoading, toast]);

    const handleDelete = async (adId: string) => {
        if(!confirm('آیا از حذف این آگهی اطمینان دارید؟ این عمل غیرقابل بازگشت است.')) return;

        try {
            await deleteDoc(doc(db, "ads", adId));
            setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
            toast({ title: 'موفقیت', description: 'آگهی با موفقیت حذف شد.' });
        } catch (error) {
            console.error("Error deleting ad: ", error);
            toast({ variant: 'destructive', title: 'خطا در حذف آگهی', description: 'مشکلی پیش آمده، لطفا دوباره تلاش کنید.' });
        }
    }
    
  if (authLoading || loading) {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    )
  }
  
  if (!user) {
    return (
        <div className="container mx-auto py-10 text-center">
             <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>دسترسی غیرمجاز</CardTitle>
                    <CardDescription>برای مشاهده آگهی‌های خود، لطفا ابتدا وارد شوید.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/login">
                        <Button>ورود یا ثبت‌نام</Button>
                    </Link>
                </CardContent>
             </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-headline">مدیریت آگهی‌های من</h1>
        <Link href="/post-ad">
            <Button>
            <PlusCircle className="ml-2 h-4 w-4" />
            آگهی جدید
            </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست آگهی‌ها</CardTitle>
          <CardDescription>
            در اینجا می‌توانید آگهی‌های خود را مدیریت، ویرایش یا حذف کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">تصویر</span>
                </TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="hidden md:table-cell">قیمت</TableHead>
                <TableHead className="hidden md:table-cell">
                  تاریخ ثبت
                </TableHead>
                <TableHead>
                  <span className="sr-only">اقدامات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.length > 0 ? ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={ad.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={ad.images?.[0] || "https://picsum.photos/seed/ad/64/64"}
                      width="64"
                      data-ai-hint="ad image"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>
                    <Badge variant={ad.status === "active" ? "default" : ad.status === "expired" ? "destructive" : "secondary"}>
                      {ad.status === 'active' ? 'فعال' : ad.status === 'pending' ? 'در انتظار تایید' : 'منقضی شده'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ad.priceType === 'fixed' ? `${Number(ad.price).toLocaleString('fa-IR')} تومان` : ad.priceType === 'negotiable' ? 'توافقی' : 'رایگان'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ad.createdAt?.seconds ? new Date(ad.createdAt.seconds * 1000).toLocaleDateString('fa-IR') : ''}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/post-ad?edit=${ad.id}`} className="flex items-center w-full">
                            <FilePenLine className="h-4 w-4 ml-2"/>
                            ویرایش
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/40"
                          onClick={() => ad.id && handleDelete(ad.id)}
                        >
                            <Trash2 className="h-4 w-4 ml-2"/>
                            حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        شما هنوز هیچ آگهی ثبت نکرده‌اید.
                    </TableCell>
                 </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            نمایش <strong>{ads.length}</strong> از <strong>{ads.length}</strong> آگهی
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
