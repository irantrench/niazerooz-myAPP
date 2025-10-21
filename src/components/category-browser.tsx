import {
  Building,
  Car,
  Wrench,
  Briefcase,
  Heart,
  Home,
  ShoppingCart,
  GraduationCap,
  Computer,
  Dog,
  Smartphone,
  Handshake,
  Stethoscope,
  Lamp,
  Building2,
  Ship,
  Wheat,
  Plane
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const categories = [
  { name: "بازرگانی", icon: Handshake },
  { name: "موبایل", icon: Smartphone },
  { name: "حیوانات خانگی", icon: Dog },
  { name: "کامپیوتر", icon: Computer },
  { name: "آموزش", icon: GraduationCap },
  { name: "کشاورزی و دامداری", icon: Wheat },
  { name: "خدمات مسافرتی", icon: Plane },
  { name: "املاک", icon: Home },
  { name: "خدمات", icon: Wrench },
  { name: "کار و استخدام", icon: Briefcase },
  { name: "لوازم", icon: Lamp },
  { name: "پزشکی و سلامت", icon: Stethoscope },
  { name: "صنعت", icon: Building2 },
  { name: "خدمات ساختمانی", icon: Wrench },
  { name: "وسایل نقلیه", icon: Car },
];


export default function CategoryBrowser() {
  return (
    <section className="py-8">
      <div className="bg-card p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-center font-headline">
          گروه‌بندی
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href="#" key={category.name} className="group">
                  <div className="flex flex-col items-center justify-start p-2 gap-2 text-center h-full">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                       <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                    </div>
                    <span className="font-semibold text-xs text-center">{category.name}</span>
                  </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
