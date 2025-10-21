import type {Metadata} from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import BottomNav from '@/components/bottom-nav';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700']
});


export const metadata: Metadata = {
  title: 'نیاز روز',
  description: 'نیازمندی‌های شما، بازآفرینی شده.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${poppins.variable} ${ptSans.variable} scroll-smooth`}>
      <body className="font-body bg-background antialiased aurora-background">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-20">
            {children}
          </main>
          <Toaster />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
