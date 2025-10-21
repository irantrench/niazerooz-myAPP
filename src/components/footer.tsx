import Link from "next/link";
import { Package2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-semibold">NiazRooz</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your daily needs, reimagined. Find everything you need, right in your neighborhood.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-medium mb-4">Categories</h4>
            <ul className="grid gap-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Real Estate</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Vehicles</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>For Sale</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-medium mb-4">About Us</h4>
            <ul className="grid gap-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Our Story</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-medium mb-4">Support</h4>
            <ul className="grid gap-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NiazRooz Reimagined. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
