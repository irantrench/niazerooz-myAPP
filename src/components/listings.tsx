import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Listing } from "@/lib/types";
import ListingCard from "./listing-card";

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Sleek 2022 Sedan for City Driving",
    description: "Low mileage, excellent condition. Perfect for commuting and weekend trips. Full service history available.",
    price: "$22,500",
    category: "Vehicles",
    location: "Tehran",
    image: {
      src: PlaceHolderImages[0]?.imageUrl || "https://picsum.photos/seed/1/600/400",
      width: 600,
      height: 400,
      alt: "A modern sedan",
      hint: PlaceHolderImages[0]?.imageHint || "modern car",
    }
  },
  {
    id: "2",
    title: "Chic Downtown Apartment with View",
    description: "1-bedroom apartment in the heart of the city. Floor-to-ceiling windows with stunning skyline views.",
    price: "$2,100/mo",
    category: "Real Estate",
    location: "Shiraz",
    image: {
      src: PlaceHolderImages[1]?.imageUrl || "https://picsum.photos/seed/2/600/400",
      width: 600,
      height: 400,
      alt: "Apartment living room",
      hint: PlaceHolderImages[1]?.imageHint || "apartment interior",
    }
  },
  {
    id: "3",
    title: "Senior React Developer Position",
    description: "Looking for an experienced React developer to join our remote team. Build innovative web applications.",
    price: "Competitive Salary",
    category: "Jobs",
    location: "Remote",
    image: {
      src: PlaceHolderImages[2]?.imageUrl || "https://picsum.photos/seed/3/600/400",
      width: 600,
      height: 400,
      alt: "Laptop on a desk",
      hint: PlaceHolderImages[2]?.imageHint || "freelance work",
    }
  },
  {
    id: "4",
    title: "Vintage Film Camera Collection",
    description: "A set of 5 classic 35mm film cameras, including models from Canon, Nikon, and Pentax. All in working order.",
    price: "$850",
    category: "For Sale",
    location: "Isfahan",
    image: {
      src: PlaceHolderImages[3]?.imageUrl || "https://picsum.photos/seed/4/600/400",
      width: 600,
      height: 400,
      alt: "Vintage cameras",
      hint: PlaceHolderImages[3]?.imageHint || "vintage items",
    }
  },
   {
    id: "5",
    title: "Professional Gardening & Landscaping",
    description: "Transform your outdoor space. We offer weekly maintenance, landscape design, and seasonal planting services.",
    price: "Free Estimate",
    category: "Services",
    location: "Mashhad",
    image: {
      src: PlaceHolderImages[4]?.imageUrl || "https://picsum.photos/seed/5/600/400",
      width: 600,
      height: 400,
      alt: "A beautiful garden",
      hint: PlaceHolderImages[4]?.imageHint || "gardening service",
    }
  },
  {
    id: "6",
    title: "Brand New Unlocked Smartphone",
    description: "Latest model smartphone, still in the box. Unlocked for any carrier. 256GB storage, stunning display.",
    price: "$950",
    category: "Electronics",
    location: "Tehran",
    image: {
      src: PlaceHolderImages[5]?.imageUrl || "https://picsum.photos/seed/6/600/400",
      width: 600,
      height: 400,
      alt: "A new smartphone",
      hint: PlaceHolderImages[5]?.imageHint || "new smartphone",
    }
  },
];

export default function Listings() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-headline">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
