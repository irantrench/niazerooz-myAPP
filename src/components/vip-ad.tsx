import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function VipAd() {
  return (
    <div className="relative bg-card gradient-border rounded-2xl shadow-deep overflow-hidden my-8 p-4 animate-subtle-float">
       <div className="absolute top-0 right-0">
         <div className="absolute transform rotate-45 bg-accent text-center text-accent-foreground font-semibold py-1 right-[-34px] top-[18px] w-[120px] shadow-lg">
            VIP
          </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-1/3">
           <Image
            src="https://static.niazerooz.com/Im/O/4/0217/C320X260_177919000463.jpg"
            alt="خانه بازی و شهربازی"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full aspect-video shadow-md"
            data-ai-hint="kids playground"
          />
        </div>
        <div className="flex-grow text-right space-y-4">
          <h3 className="font-headline text-lg md:text-xl font-bold">
            راه‌اندازی صفر تا صد خانه بازی و شهربازی با تیم متخصص ما
          </h3>
          <p className="text-sm text-muted-foreground">تهران | طهماسبی</p>
          <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full shadow-lg hover:shadow-primary/40 transition-shadow">
            اطلاعات بیشتر
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
