'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { updateProfile } from 'firebase/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: "نام کاربری باید حداقل ۲ کاراکتر باشد.",
  }),
  email: z.string().email({
    message: "لطفا یک ایمیل معتبر وارد کنید.",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
    values: {
        displayName: user?.displayName || '',
        email: user?.email || ''
    },
    mode: "onChange",
  });

  async function onSubmit(values: ProfileFormValues) {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
        await updateProfile(user, {
            displayName: values.displayName,
        });

        // Here you would also update the user's document in Firestore
        // const userDocRef = doc(db, 'users', user.uid);
        // await updateDoc(userDocRef, { displayName: values.displayName });

        toast({
            title: "پروفایل با موفقیت بروزرسانی شد!",
        });
        router.push('/profile');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "متاسفیم",
        description: "مشکلی در بروزرسانی پروفایل پیش آمده است.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading) {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    )
  }

  if (!user) {
    return (
        <div className="container mx-auto py-10 text-center">
             <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>دسترسی غیرمجاز</CardTitle>
                    <CardDescription>برای ویرایش پروفایل، لطفا ابتدا وارد شوید.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/login">
                        <Button>ورود یا ثبت‌نام</Button>
                    </Link>
                </CardContent>
             </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>ویرایش پروفایل</CardTitle>
                <CardDescription>اطلاعات کاربری خود را در اینجا ویرایش کنید.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>نام نمایشی</FormLabel>
                        <FormControl>
                            <Input placeholder="نام نمایشی" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>ایمیل</FormLabel>
                        <FormControl>
                            <Input placeholder="ایمیل" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            ذخیره تغییرات
                        </Button>
                        <Link href="/profile">
                            <Button type="button" variant="outline">
                                انصراف
                            </Button>
                        </Link>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
