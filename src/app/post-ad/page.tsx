
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, Camera, Check, DollarSign, List, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import CategoryBrowser from '@/components/category-browser';
import { cn } from '@/lib/utils';

const adSchema = z.object({
  category: z.string().min(1, 'انتخاب دسته‌بندی الزامی است.'),
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد.'),
  description: z.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد.'),
  priceType: z.enum(['fixed', 'negotiable', 'free']),
  price: z.string().optional(),
  image: z.string().optional(), // In a real app, this would be a file upload
});

type AdFormValues = z.infer<typeof adSchema>;

const steps = [
  { id: 'category', title: 'انتخاب دسته‌بندی', icon: List },
  { id: 'details', title: 'جزئیات آگهی', icon: FileText },
  { id: 'pricing', title: 'قیمت‌گذاری', icon: DollarSign },
  { id: 'media', title: 'تصویر آگهی', icon: Camera },
  { id: 'finish', title: 'پایان', icon: Check },
];

export default function PostAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      category: '',
      title: '',
      description: '',
      priceType: 'fixed',
      price: '',
      image: '',
    },
    mode: 'onChange'
  });

  const selectedCategory = form.watch('category');

  const handleCategorySelect = (categoryName: string) => {
    form.setValue('category', categoryName, { shouldValidate: true, shouldDirty: true });
  }

  const handleNext = async () => {
    let isValid = false;
    switch (currentStep) {
      case 0:
        isValid = await form.trigger('category');
        if(!isValid) toast({ variant: 'destructive', title: 'لطفا یک دسته‌بندی انتخاب کنید.' });
        break;
      case 1:
        isValid = await form.trigger(['title', 'description']);
        break;
      case 2:
        isValid = await form.trigger(['priceType', 'price']);
        if (form.getValues('priceType') === 'fixed' && !form.getValues('price')) {
          form.setError('price', { type: 'manual', message: 'وارد کردن قیمت الزامی است.' });
          isValid = false;
        }
        break;
      case 3:
        isValid = true; // Image upload is optional
        break;
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const onSubmit = async (data: AdFormValues) => {
    setIsLoading(true);
    console.log(data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(steps.length - 1); // Go to finish step
  };
  
  const progress = ((currentStep) / (steps.length - 2)) * 100;

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">
            {steps[currentStep].title}
          </CardTitle>
          {currentStep < steps.length - 1 && (
             <Progress value={progress} className="w-full mt-4" />
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 0 && (
                <div>
                   <p className="text-center text-muted-foreground mb-4">لطفا گروه آگهی خود را انتخاب کنید.</p>
                   <div onClick={(e) => {
                     const target = e.target as HTMLElement;
                     const categoryElement = target.closest('.group');
                     if(categoryElement){
                       const categoryName = categoryElement.querySelector('span')?.textContent;
                       if(categoryName) handleCategorySelect(categoryName);
                     }
                   }}>
                    <CategoryBrowser selectedCategory={selectedCategory} isSelectable={true} />
                   </div>
                   <FormField
                      control={form.control}
                      name="category"
                      render={() => (
                        <FormItem>
                          <FormMessage className="text-center pt-4" />
                        </FormItem>
                      )}
                    />
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان آگهی</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: آپارتمان ۱۲۰ متری در مرکز شهر" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="جزئیات کامل آگهی خود را در اینجا بنویسید..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="priceType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>نوع قیمت</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">قیمت مقطوع</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="negotiable" />
                              </FormControl>
                              <FormLabel className="font-normal">توافقی</FormLabel>
                            </FormItem>
                             <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="free" />
                              </FormControl>
                              <FormLabel className="font-normal">رایگان</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch('priceType') === 'fixed' && (
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>مبلغ (تومان)</FormLabel>
                            <FormControl>
                              <Input type="number" dir="ltr" placeholder="5,000,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  )}
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                        <Camera className="w-12 h-12 text-gray-400 mb-2"/>
                        <p className="text-muted-foreground">تصویر آگهی خود را اینجا بکشید و رها کنید</p>
                        <p className="text-xs text-muted-foreground">یا</p>
                        <Button type="button" variant="outline" className="mt-2">انتخاب فایل</Button>
                    </div>
                    <FormDescription>
                        حداکثر ۸ تصویر می‌توانید بارگذاری کنید.
                    </FormDescription>
                </div>
              )}

              {currentStep === 4 && (
                 <div className="text-center py-10">
                    <Check className="w-16 h-16 text-green-500 mx-auto mb-4 bg-green-100 dark:bg-green-900/50 rounded-full p-2" />
                    <h2 className="text-2xl font-bold mb-2">آگهی شما با موفقیت ثبت شد!</h2>
                    <p className="text-muted-foreground mb-6">آگهی شما پس از تایید توسط مدیران، در سایت نمایش داده خواهد شد.</p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => {
                          form.reset();
                          setCurrentStep(0);
                        }}>ثبت آگهی جدید</Button>
                        <Button variant="outline">مشاهده آگهی‌های من</Button>
                    </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-8">
                  {currentStep < steps.length - 1 && (
                    <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                      <ArrowRight className="ml-2 h-4 w-4" />
                      بازگشت
                    </Button>
                  )}

                  {currentStep < steps.length - 2 && (
                    <Button type="button" onClick={handleNext}>
                      ادامه
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  )}

                  {currentStep === steps.length - 2 && (
                   <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          در حال ثبت...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          ثبت نهایی آگهی
                        </>
                      )}
                   </Button>
                  )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
