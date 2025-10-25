'use client';

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const signupSchema = z.object({
  fullName: z.string().min(3, { message: "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد" }),
  email: z.string().email({ message: "ایمیل نامعتبر است" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

type SignupSchemaType = z.infer<typeof signupSchema>;


export default function SignupPage() {
    const { signup, loginWithGoogle, loading, error } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
        try {
            await signup(data.email, data.password, data.fullName);
            toast({ title: "ثبت‌نام موفقیت‌آمیز بود", description: "خوش آمدید! لطفا وارد شوید." });
            router.push('/login');
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "خطا در ثبت‌نام",
                description: err.message || "اطلاعات وارد شده نادرست است.",
            });
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
          await loginWithGoogle();
          toast({ title: "ورود با گوگل موفقیت‌آمیز بود", description: "خوش آمدید!" });
          router.push('/profile');
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "خطا در ورود با گوگل",
                description: err.message || "مشکلی پیش آمده، لطفا دوباره تلاش کنید.",
            });
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">ایجاد حساب کاربری</CardTitle>
          <CardDescription className="text-center">
            اطلاعات خود را برای ساخت حساب جدید وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name">نام و نام خانوادگی</Label>
                <Input id="full-name" placeholder="مثال: علی رضایی" {...register("fullName")} />
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                dir="ltr"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required dir="ltr" {...register("password")} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "ایجاد حساب"}
            </Button>
             <Button variant="outline" className="w-full" onClick={handleGoogleLogin} type="button" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "ثبت‌نام با گوگل"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="underline">
              وارد شوید
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
