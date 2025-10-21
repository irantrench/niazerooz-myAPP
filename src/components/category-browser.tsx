import {
  Building,
  Car,
  Wrench,
  Tag,
  Briefcase,
  Heart,
  Home,
  ShoppingCart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/lib/types";
import Link from 'next/link';

const categories: Category[] = [
  { name: "Real Estate", icon: Home },
  { name: "Vehicles", icon: Car },
  { name: "Services", icon: Wrench },
  { name: "For Sale", icon: ShoppingCart },
  { name: "Jobs", icon: Briefcase },
  { name: "Personal", icon: Heart },
  { name: "Community", icon: Building },
  { name: "Electronics", icon: Tag },
];

export default function CategoryBrowser() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-headline">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href="#" key={category.name} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-3 text-center">
                    <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                       <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
