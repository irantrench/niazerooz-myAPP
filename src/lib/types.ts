import type { LucideIcon } from 'lucide-react';

export interface Category {
  name: string;
  icon: LucideIcon;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    hint: string;
  }
}
