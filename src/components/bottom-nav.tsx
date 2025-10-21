'use client';

import Link from 'next/link';
import { Home, LayoutGrid, PlusSquare, MapPin, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'خانه', icon: Home },
  { href: '/categories', label: 'گروه‌بندی', icon: LayoutGrid },
  { href: '/post-ad', label: 'ثبت آگهی رایگان', icon: PlusSquare, isCentral: true },
  { href: '/city', label: 'شهر', icon: MapPin },
  { href: '/profile', label: 'نیاز روز من', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-900 text-white shadow-[0_-2px_5px_rgba(0,0,0,0.2)] z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <Link href={item.href} key={item.href} className="flex flex-col items-center -mt-8">
                <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-16 w-16 shadow-lg border-4 border-gray-800">
                  <PlusSquare className="h-8 w-8" />
                </div>
                <span className="text-xs text-center mt-1 font-semibold text-primary">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link href={item.href} key={item.href} className="flex-1">
              <div className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors h-full",
                isActive ? "text-primary bg-primary/10" : "text-gray-400 hover:text-white"
              )}>
                <Icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
