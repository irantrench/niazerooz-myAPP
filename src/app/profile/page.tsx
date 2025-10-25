'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  User,
  FileText,
  Bookmark,
  Sparkles,
  Wallet,
  Tag,
  ShoppingCart,
  Receipt,
  PenSquare,
  KeyRound,
  LogIn,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: FileText, label: "آگهی‌های من", href: "/my-ads" },
  { icon: KeyRound, label: "عبارت‌های کسب و کار من در گوگل", href: "/profile/google-keywords" },
  { icon: Bookmark, label: "مجوزهای من", href: "/profile/licenses" },
  { icon: Sparkles, label: "سرویس‌های من", href: "/profile/my-services" },
  { icon: Wallet, label: "اعتبار مالی من", href: "/profile/wallet" },
  { icon: Tag, label: "تعرفه سرویس‌ها", href: "/services" },
  { icon: ShoppingCart, label: "خرید یا تمدید سرویس", href: "/services" },
  { icon: Receipt, label: "مشخصات فاکتور رسمی", href: "/profile/invoice-info" },
];

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: "خروج موفق", description: "شما با موفقیت از حساب خود خارج شدید." });
      router.push('/');
    } catch (error) {
      toast({ variant: "destructive", title: "خطا در خروج", description: "مشکلی پیش آمده، لطفا دوباره تلاش کنید." });
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-4">
        {/* Banner */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300">
           <Link href="/services/vip">
              <Image
                src="https://www.niazerooz.com/images/Personal/Banner.jpg"
                alt="اعطای نمایندگی انحصاری"
                width={1200}
                height={200}
                className="object-cover w-full"
              />
           </Link>
        </div>

        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-headline font-bold">نیاز روز من</h1>
          <ChevronLeft className="w-6 h-6 text-muted-foreground" />
        </div>
        
        {loading ? (
             <div className="flex justify-center items-center bg-card p-4 rounded-xl shadow-lg border mb-6 h-28">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
        ) : user ? (
            <div className="bg-card p-4 rounded-xl shadow-sm border mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={48} height={48} className="rounded-full bg-gray-800" />
                  <div>
                    <p className="font-semibold text-foreground">{user.displayName || user.email}</p>
                    <p className="text-sm text-muted-foreground" dir="ltr">{user.phoneNumber || 'شماره تلفن ثبت نشده'}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          ) : (
             <div className="bg-card p-4 rounded-xl shadow-lg border mb-6 text-center">
                <p className="mb-4">برای مدیریت آگهی‌ها و دسترسی به امکانات خود، وارد شوید.</p>
                <Link href="/login">
                  <Button>
                    <LogIn className="w-4 h-4 ml-2" />
                    <span>ورود یا ثبت‌نام</span>
                  </Button>
                </Link>
             </div>
          )}


        {/* Menu List */}
        <div className="bg-card rounded-xl shadow-lg border">
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index} className={!user && item.href.startsWith('/my') ? 'pointer-events-none' : ''}>
                    <div className={cn("flex items-center justify-between p-4 group", !user && item.href.startsWith('/my') && 'opacity-50 cursor-not-allowed')}>
                        <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.label}
                        </span>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-[-4px]" />
                    </div>
                     {index < menuItems.length - 1 && <hr className="border-border mx-4"/>}
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
