import Link from 'next/link';
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

const categories = [
  { name: "املاک", icon: HouseBuildingIcon, href: "#" },
  { name: "وسایل نقلیه", icon: CarSideIcon, href: "#" },
  { name: "خدمات مسافرتی", icon: PersonWalkingLuggageIcon, href: "#" },
  { name: "خدمات ساختمانی", icon: ApartmentIcon, href: "#" },
  { name: "کشاورزی و دامداری", icon: WheatIcon, href: "#" },
  { name: "صنعت", icon: GearsIcon, href: "#" },
  { name: "آموزش", icon: GraduationCapIcon, href: "#" },
  { name: "پزشکی و سلامت", icon: StethoscopeIcon, href: "#" },
  { name: "کامپیوتر", icon: ComputerIcon, href: "#" },
  { name: "لوازم", icon: LampIcon, href: "#" },
  { name: "حیوانات خانگی", icon: DogIcon, href: "#" },
  { name: "کار و استخدام", icon: BriefcaseIcon, href: "#" },
  { name: "موبایل", icon: MobileNotchIcon, href: "#" },
  { name: "خدمات", icon: ScrewdriverWrenchIcon, href: "#" },
  { name: "بازرگانی", icon: HandshakeIcon, href: "#" },
];


export default function CategoryBrowser() {
  return (
    <section className="my-8">
      <div className="bg-card p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-headline font-bold mb-4 text-center">
          گروه‌بندی
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href={category.href} key={category.name} className="group">
                  <div className="flex flex-col items-center justify-start p-2 gap-2 text-center h-full">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3.5 rounded-full group-hover:bg-primary/10 transition-colors duration-200">
                       <Icon className="h-7 w-7 text-gray-700 dark:text-gray-400 group-hover:text-primary" />
                    </div>
                    <span className="font-body text-sm text-center">{category.name}</span>
                  </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
