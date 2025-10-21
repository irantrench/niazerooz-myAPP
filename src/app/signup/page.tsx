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

export default function SignupPage() {
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
          <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name">نام و نام خانوادگی</Label>
                <Input id="full-name" placeholder="مثال: علی رضایی" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required dir="ltr" />
            </div>
            <Button type="submit" className="w-full">
              ایجاد حساب
            </Button>
             <Button variant="outline" className="w-full">
              ثبت‌نام با گوگل
            </Button>
          </div>
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
