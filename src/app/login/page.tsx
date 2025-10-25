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

const loginSchema = z.object({
  email: z.string().email({ message: "ایمیل نامعتبر است" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, loginWithGoogle, loading, error } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      await login(data.email, data.password);
      toast({ title: "ورود موفقیت‌آمیز بود", description: "خوش آمدید!" });
      router.push('/profile');
    } catch (err: any) {
        toast({
            variant: "destructive",
            title: "خطا در ورود",
            description: err.message || "لطفا اطلاعات وارد شده را بررسی کنید.",
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
          <CardTitle className="text-2xl text-center">ورود به حساب کاربری</CardTitle>
          <CardDescription className="text-center">
            برای دسترسی به پنل مدیریت خود وارد شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <Link href="#" className="mr-auto inline-block text-sm underline">
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>
              <Input id="password" type="password" required dir="ltr" {...register("password")} />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "ورود"}
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} type="button" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "ورود با گوگل"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="underline">
              ثبت نام کنید
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
