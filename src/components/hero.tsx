import Image from 'next/image';

export default function Hero() {
  return (
    <div className="my-4">
      <div className="relative w-full aspect-[2/1] md:aspect-[3/1] rounded-lg overflow-hidden">
        <Image 
          src="https://s.niazerooz.com/2024/05/26/17167123985655.jpg"
          alt="افتخار اعتماد و همراهی شما در طول ۲۲ سال فعالیت"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
