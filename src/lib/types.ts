import type { Timestamp } from 'firebase/firestore';

export interface Ad {
  id?: string;
  title: string;
  description: string;
  priceType: 'fixed' | 'negotiable' | 'free';
  price?: number;
  category: string;
  location?: string;
  images?: string[];
  userId: string;
  userDisplayName: string;
  status: 'active' | 'pending' | 'expired';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
}
