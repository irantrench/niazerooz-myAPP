'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, Timestamp, FieldValue } from 'firebase/firestore';
import { auth, db } from '@/firebase/client';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileType | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export interface UserProfileType {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Timestamp | FieldValue | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfileType;
            setUserProfile(profile);
        } else {
            // Create a profile if it doesn't exist (e.g. for Google login)
            const newUserProfile: UserProfileType = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: serverTimestamp()
            };
            await setDoc(userDocRef, newUserProfile);
            setUserProfile(newUserProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = 'مشکلی در ورود به حساب کاربری پیش آمده است.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'رمز عبور اشتباه است.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'کاربری با این ایمیل یافت نشد.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'ایمیل یا رمز عبور نامعتبر است.'
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      
      const newUserProfile: UserProfileType = {
        uid: userCredential.user.uid,
        displayName: fullName,
        email: email,
        photoURL: userCredential.user.photoURL,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUserProfile);
      
    } catch (error: any) {
      let errorMessage = 'مشکلی در ثبت نام پیش آمده است.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'این ایمیل قبلا ثبت شده است.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'رمز عبور ضعیف است. لطفا یک رمز عبور قوی‌تر انتخاب کنید.';
      }
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error: any) {
        let errorMessage = 'مشکلی در ورود با گوگل پیش آمده است.';
        if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = 'پنجره ورود با گوگل توسط شما بسته شد.'
        }
        setError(errorMessage);
        throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error?.message || 'مشکلی در خروج از حساب کاربری پیش آمده است.');
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // A loading screen for the initial auth state check
  if (loading && !user) {
      return (
          <div className="w-full h-screen flex justify-center items-center bg-background">
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
          </div>
      )
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, error, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
