
import CategoryBrowser from '@/components/category-browser';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LayoutGrid } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
         <CardHeader>
            <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-2">
              <LayoutGrid className="w-6 h-6 text-primary" />
              تمام دسته‌بندی‌ها
            </CardTitle>
         </CardHeader>
         <CardContent>
            <CategoryBrowser />
         </CardContent>
      </Card>
    </div>
  );
}
    