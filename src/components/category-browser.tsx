
import {
  HouseBuildingIcon,
  CarSideIcon,
  PersonWalkingLuggageIcon,
  ApartmentIcon,
  WheatIcon,
  GearsIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  ComputerIcon,
  LampIcon,
  DogIcon,
  BriefcaseIcon,
  MobileNotchIcon,
  ScrewdriverWrenchIcon,
  HandshakeIcon,
} from './svg-icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const categories = [
  { name: "املاک", icon: HouseBuildingIcon, href: "/listings?category=real-estate" },
  { name: "وسایل نقلیه", icon: CarSideIcon, href: "/listings?category=vehicles" },
  { name: "خدمات مسافرتی", icon: PersonWalkingLuggageIcon, href: "/listings?category=travel" },
  { name: "خدمات ساختمانی", icon: ApartmentIcon, href: "/listings?category=building" },
  { name: "کشاورزی و دامداری", icon: WheatIcon, href: "/listings?category=agriculture" },
  { name: "صنعت", icon: GearsIcon, href: "/listings?category=industry" },
  { name: "آموزش", icon: GraduationCapIcon, href: "/listings?category=education" },
  { name: "پزشکی و سلامت", icon: StethoscopeIcon, href: "/listings?category=health" },
  { name: "کامپیوتر", icon: ComputerIcon, href: "/listings?category=computer" },
  { name: "لوازم", icon: LampIcon, href: "/listings?category=appliances" },
  { name: "حیوانات خانگی", icon: DogIcon, href: "/listings?category=pets" },
  { name: "کار و استخدام", icon: BriefcaseIcon, href: "/listings?category=jobs" },
  { name: "موبایل", icon: MobileNotchIcon, href: "/listings?category=mobile" },
  { name: "خدمات", icon: ScrewdriverWrenchIcon, href: "/listings?category=services" },
  { name: "بازرگانی", icon: HandshakeIcon, href: "/listings?category=business" },
];

interface CategoryBrowserProps {
  selectedCategory?: string;
  isSelectable?: boolean;
}

export default function CategoryBrowser({ selectedCategory, isSelectable = false }: CategoryBrowserProps) {
  return (
    <section className="my-8">
      <div className="bg-card p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-headline font-bold mb-4 text-center">
          گروه‌بندی
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            const Wrapper = isSelectable ? 'div' : Link;
            const props = isSelectable ? {} : { href: category.href };

            return (
              <Wrapper key={category.name} {...props} className="group cursor-pointer">
                  <div className={cn(
                      "flex flex-col items-center justify-start p-2 gap-2 text-center h-full rounded-lg transition-colors duration-200",
                      isSelected && "bg-primary/20"
                    )}>
                    <div className={cn(
                      "bg-gray-100 dark:bg-gray-800 p-3.5 rounded-full group-hover:bg-primary/10 transition-colors duration-200",
                      isSelected && "bg-primary/30"
                      )}>
                       <Icon className={cn(
                         "h-7 w-7 text-gray-700 dark:text-gray-400 group-hover:text-primary",
                         isSelected && "text-primary"
                        )} />
                    </div>
                    <span className="font-body text-sm text-center">{category.name}</span>
                  </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
