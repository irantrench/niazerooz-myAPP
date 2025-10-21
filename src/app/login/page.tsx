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

export default function LoginPage() {
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
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <Link href="#" className="mr-auto inline-block text-sm underline">
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>
              <Input id="password" type="password" required dir="ltr" />
            </div>
            <Button type="submit" className="w-full">
              ورود
            </Button>
            <Button variant="outline" className="w-full">
              ورود با گوگل
            </Button>
          </div>
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
