import Image from "next/image";
import { MoreHorizontal, PlusCircle, Trash2, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for user's ads
const ads = [
  {
    title: "راه‌اندازی صفر تا صد خانه بازی",
    status: "فعال",
    price: "توافقی",
    createdAt: "2023-10-26",
    image: "https://static.niazerooz.com/Im/O/4/0217/C320X260_177919000463.jpg"
  },
  {
    title: "فروش آپارتمان 120 متری",
    status: "در انتظار تایید",
    price: "۵٬۰۰۰٬۰۰۰٬۰۰۰ تومان",
    createdAt: "2023-10-24",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop"
  },
    {
    title: "مدرس خصوصی ریاضی",
    status: "منقضی شده",
    price: "ساعتی ۲۰۰٬۰۰۰ تومان",
    createdAt: "2023-09-15",
     image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop"
  },
];

export default function MyAdsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-headline">مدیریت آگهی‌های من</h1>
        <Link href="/post-ad">
            <Button>
            <PlusCircle className="ml-2 h-4 w-4" />
            آگهی جدید
            </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست آگهی‌ها</CardTitle>
          <CardDescription>
            در اینجا می‌توانید آگهی‌های خود را مدیریت، ویرایش یا حذف کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">تصویر</span>
                </TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="hidden md:table-cell">قیمت</TableHead>
                <TableHead className="hidden md:table-cell">
                  تاریخ ثبت
                </TableHead>
                <TableHead>
                  <span className="sr-only">اقدامات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={ad.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={ad.image}
                      width="64"
                      data-ai-hint="ad image"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{ad.title}</TableCell>
                  <TableCell>
                    <Badge variant={ad.status === "فعال" ? "default" : ad.status === "منقضی شده" ? "destructive" : "secondary"}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ad.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ad.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <FilePenLine className="h-4 w-4 ml-2"/>
                            ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/40">
                            <Trash2 className="h-4 w-4 ml-2"/>
                            حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            نمایش <strong>1-3</strong> از <strong>3</strong> آگهی
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
