import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Package2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-semibold">NiazRooz</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            All Listings
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Button variant="outline">Log In</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Post an Ad
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                  prefetch={false}
                >
                  <Package2 className="h-6 w-6 text-primary" />
                  <span className="sr-only">NiazRooz</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  All Listings
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
