import Image from 'next/image';

const featuresRight = [
  {
    text: "هر چقدر که می‌خوای آگهی رایگان ثبت کن!",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/feature-free-order.png"
  },
  {
    text: "زنگ‌خورت می‌ره بالا، حالا فقط بفروش!",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/feature-ring-sale.png"
  },
  {
    text: "هرجا راهنمایی خواستی رو ما حساب کن.",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/feature-support.png"
  }
];

const featuresLeft = [
  {
    text: "هر سرویس نامحدودی بخری، برای همه آگهی‌هات فعال می‌شه!",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/feature-unlimite.png"
  },
  {
    text: "راستی! اولین سرویست رو هم مهمون ما باش!",
    image: "https://cdnnr.niazerooz.com/resources/images/mobile/home/feature-gift.png"
  }
];

export default function HomeFeatures() {
  return (
    <section className="my-8 bg-card p-4 rounded-2xl shadow-md">
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            {featuresRight.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <Image src={feature.image} alt={feature.text} fill className="object-contain" />
                </div>
                <p className="font-body text-base font-semibold" dangerouslySetInnerHTML={{ __html: feature.text.replace('<br>', '') }} />
              </div>
            ))}
          </div>
          <div className="hidden md:block w-px bg-border h-48"></div>
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            {featuresLeft.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                 <div className="relative h-16 w-16">
                  <Image src={feature.image} alt={feature.text} fill className="object-contain" />
                </div>
                <p className="font-body text-base font-semibold">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
