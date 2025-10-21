import Image from "next/image";
import Link from "next/link";
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
  LogIn
} from "lucide-react";

const menuItems = [
  { icon: FileText, label: "آگهی‌های من", href: "/my-ads" },
  { icon: KeyRound, label: "عبارت‌های کسب و کار من در گوگل", href: "#" },
  { icon: Bookmark, label: "مجوزهای من", href: "#" },
  { icon: Sparkles, label: "سرویس‌های من", href: "#" },
  { icon: Wallet, label: "اعتبار مالی من", href: "#" },
  { icon: Tag, label: "تعرفه سرویس‌ها", href: "#" },
  { icon: ShoppingCart, label: "خرید یا تمدید سرویس", href: "#" },
  { icon: Receipt, label: "مشخصات فاکتور رسمی", href: "#" },
];

export default function ProfilePage() {
  const isLoggedIn = false; // Mock data, will be replaced with real auth state

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-4">
        {/* Banner */}
        <div className="mb-6">
          <Image
            src="https://www.niazerooz.com/images/Personal/Banner.jpg"
            alt="اعطای نمایندگی انحصاری"
            width={1200}
            height={200}
            className="rounded-lg object-cover w-full"
          />
        </div>

        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-headline font-bold">نیاز روز من</h1>
          <ChevronLeft className="w-6 h-6 text-muted-foreground" />
        </div>

        {isLoggedIn ? (
            <div className="bg-card p-4 rounded-xl shadow-sm border mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">هیلتی مارکت</p>
                    <p className="text-sm text-muted-foreground" dir="ltr">0939 563 6312</p>
                  </div>
                </div>
                <Link href="#" className="text-primary text-sm font-semibold flex items-center gap-1">
                  <PenSquare className="w-4 h-4"/>
                  <span>ویرایش</span>
                </Link>
              </div>
            </div>
          ) : (
             <div className="bg-card p-4 rounded-xl shadow-sm border mb-6 text-center">
                <p className="mb-4">برای مدیریت آگهی‌ها و دسترسی به امکانات خود، وارد شوید.</p>
                <Link href="/login">
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">
                    <LogIn className="w-4 h-4" />
                    <span>ورود یا ثبت‌نام</span>
                  </button>
                </Link>
             </div>
          )}


        {/* Menu List */}
        <div className="bg-card rounded-xl shadow-sm border">
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index}>
                    <div className="flex items-center justify-between p-4 group">
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
