'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const sliderImages = [
  "https://cdnnr.niazerooz.com/resources/images/mobile/slider/home-page-banner-1-686_200.jpg",
  "https://cdnnr.niazerooz.com/resources/images/mobile/slider/home-page-banner-2-686_200.jpg",
  "https://cdnnr.niazerooz.com/resources/images/mobile/slider/home-page-banner-3-343_100.png",
]

export default function HeroSlider() {
  return (
    <Carousel
      className="w-full my-4"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        loop: true,
        direction: 'rtl',
      }}
    >
      <CarouselContent>
        {sliderImages.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-[10/3] rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`Slider image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
