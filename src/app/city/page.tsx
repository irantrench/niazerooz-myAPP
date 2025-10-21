
'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const provinces = {
  "تهران": ["تهران", "شهریار", "اسلامشهر", "قدس", "ملارد"],
  "خراسان رضوی": ["مشهد", "نیشابور", "سبزوار", "تربت حیدریه"],
  "اصفهان": ["اصفهان", "کاشان", "خمینی‌شهر", "نجف‌آباد"],
  "فارس": ["شیراز", "کازرun", "جهرم", "مرودشت"],
  "آذربایجان شرقی": ["تبریز", "مراغه", "مرند", "اهر"],
  "مازندران": ["ساری", "بابل", "آمل", "قائم‌شهر"],
  "خوزستان": ["اهواز", "دزفول", "آبادان", "خرمشهر"],
  "کرمان": ["کرمان", "سیرجان", "رفسنجان", "جیرفت"],
};

export default function CityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('تهران');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // Here you would typically redirect or update global state
    console.log(`City selected: ${city}`);
  };

  const filteredProvinces = Object.entries(provinces).filter(([province, cities]) =>
    province.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              انتخاب شهر
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی شهر..."
                className="w-full rounded-full border-2 bg-white py-2 pr-10 pl-4 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <p className="text-sm text-muted-foreground pt-4 text-center">شهر انتخاب شده: <span className="font-bold text-primary">{selectedCity}</span></p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredProvinces.map(([province, cities]) => (
                <AccordionItem value={province} key={province}>
                  <AccordionTrigger className="font-semibold">{province}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {cities.map(city => (
                        <Button
                          key={city}
                          variant={selectedCity === city ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             {filteredProvinces.length === 0 && (
                <p className="text-center text-muted-foreground py-8">شهری یافت نشد.</p>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    