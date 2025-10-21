'use client';

import Link from 'next/link';
import { Home, LayoutGrid, PlusSquare, MapPin, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'خانه', icon: Home },
  { href: '/categories', label: 'گروه‌بندی', icon: LayoutGrid },
  { href: '/post-ad', label: 'ثبت آگهی', icon: PlusSquare, isCentral: true },
  { href: '/city', label: 'شهر', icon: MapPin },
  { href: '/profile', label: 'نیاز روز من', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/70 backdrop-blur-lg border-t border-white/10 shadow-deep-lg z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <Link href={item.href} key={item.href} className="flex flex-col items-center -mt-10 transition-transform duration-300 hover:scale-110">
                <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-20 w-20 shadow-deep-lg border-4 border-background group">
                  <PlusSquare className="h-9 w-9 transition-transform duration-300 group-hover:rotate-90" />
                </div>
                <span className="text-xs text-center mt-2 font-semibold text-primary">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link href={item.href} key={item.href} className="flex-1">
              <div className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300 h-full relative",
                "text-muted-foreground hover:text-primary",
                 isActive && "text-primary"
              )}>
                <Icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
                {isActive && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 bg-primary rounded-full"></div>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
