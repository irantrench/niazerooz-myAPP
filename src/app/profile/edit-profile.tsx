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

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: "نام کاربری باید حداقل ۲ کاراکتر باشد.",
  }),
  email: z.string().email({
    message: "لطفا یک ایمیل معتبر وارد کنید.",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsSubmitting(true);
    try {
      if (user) {
        await updateProfile(user, {
          displayName: values.displayName,
        });
        toast({
          title: "پروفایل با موفقیت بروزرسانی شد!",
        });
      }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام کاربری</FormLabel>
              <FormControl>
                <Input placeholder="نام کاربری" {...field} />
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
                <Input placeholder="ایمیل" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          ذخیره تغییرات
        </Button>
      </form>
    </Form>
  );
}