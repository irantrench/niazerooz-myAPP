import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function VipAd() {
  return (
    <div className="relative bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg overflow-hidden my-4 p-3">
       <div className="absolute top-0 left-0">
        <div className="relative w-16 h-16">
          <div className="absolute transform -rotate-45 bg-red-600 text-center text-white font-semibold py-1 left-[-38px] top-[16px] w-[120px]">
            VIP
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/3">
           <Image
            src="https://s.niazerooz.com/2024/07/01/17198135898890.jpg"
            alt="خانه بازی و شهربازی"
            width={600}
            height={400}
            className="rounded-md object-cover w-full aspect-video"
            data-ai-hint="kids playground"
          />
        </div>
        <div className="flex-grow text-right">
          <h3 className="font-bold">
            راه اندازی صفر تا صد خانه بازی و شهربازی با تیم متخصص ما
          </h3>
          <p className="text-sm text-muted-foreground my-2">تهران | طهماسبی</p>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            اطلاعات بیشتر
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
