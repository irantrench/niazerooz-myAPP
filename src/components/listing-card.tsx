import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/lib/types";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <Link href="#" className="block">
        <div className="relative overflow-hidden">
          <Image
            src={listing.image.src}
            alt={listing.image.alt}
            width={listing.image.width}
            height={listing.image.height}
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={listing.image.hint}
          />
          <Badge variant="secondary" className="absolute top-3 right-3">{listing.category}</Badge>
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-lg leading-tight truncate">{listing.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-2">{listing.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="font-headline font-semibold text-lg text-primary">{listing.price}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{listing.location}</span>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-primary font-semibold">
            View <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
