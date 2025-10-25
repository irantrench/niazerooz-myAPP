import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export interface Category {
  name: string;
  icon: LucideIcon;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  priceType: 'fixed' | 'negotiable' | 'free';
  price?: number;
  category: string;
  location?: string;
  images?: string[];
  userId: string;
  userDisplayName: string;
  createdAt: Timestamp;
  status: 'active' | 'pending' | 'expired';
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: Timestamp;
}
