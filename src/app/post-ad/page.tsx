
'use client';

import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, Camera, Check, DollarSign, List, FileText, Loader2, Upload, X } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CategoryBrowser from '@/components/category-browser';
import Image from 'next/image';
import Link from 'next/link';

const adSchema = z.object({
  category: z.string().min(1, 'انتخاب دسته‌بندی الزامی است.'),
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد.'),
  description: z.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد.'),
  priceType: z.enum(['fixed', 'negotiable', 'free']),
  price: z.string().optional(),
  images: z.array(z.string()).optional(),
});

type AdFormValues = z.infer<typeof adSchema>;

const steps = [
  { id: 'category', title: 'انتخاب دسته‌بندی', icon: List },
  { id: 'details', title: 'جزئیات آگهی', icon: FileText },
  { id: 'pricing', title: 'قیمت‌گذاری', icon: DollarSign },
  { id: 'media', title: 'تصاویر', icon: Camera },
  { id: 'finish', title: 'پایان', icon: Check },
];

export default function PostAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      category: '',
      title: '',
      description: '',
      priceType: 'fixed',
      price: '',
      images: [],
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
        form.setValue('images', uploadedImages);
        isValid = true; // Media is optional
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
    console.log("Submitting form data:", data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(steps.length - 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              if (uploadedImages.length + newImages.length <= 8) {
                setUploadedImages([...uploadedImages, ...newImages]);
              } else {
                 toast({ variant: 'destructive', title: 'محدودیت تعداد تصاویر', description: `شما فقط می‌توانید ${8 - uploadedImages.length} تصویر دیگر اضافه کنید.` });
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const progress = ((currentStep) / (steps.length - 2)) * 100;

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto shadow-deep-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-2">
            <steps[currentStep].icon className="w-6 h-6 text-primary" />
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
                   <CardDescription className="text-center mb-4">لطفا گروه آگهی خود را انتخاب کنید.</CardDescription>
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
                <div className="space-y-6 animate-in fade-in-50">
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
                <div className="space-y-6 animate-in fade-in-50">
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
                            <FormItem className="flex items-center space-x-3 rtl:space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">قیمت مقطوع</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 rtl:space-x-reverse space-y-0">
                              <FormControl>
                                <RadioGroupItem value="negotiable" />
                              </FormControl>
                              <FormLabel className="font-normal">توافقی</FormLabel>
                            </FormItem>
                             <FormItem className="flex items-center space-x-3 rtl:space-x-reverse space-y-0">
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
                <div className="space-y-6 animate-in fade-in-50">
                    <FormLabel>تصاویر آگهی (حداکثر ۸ تصویر)</FormLabel>
                     <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">برای انتخاب فایل کلیک کنید</span> یا فایل‌ها را به اینجا بکشید</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF (حداکثر 5 مگابایت)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" ref={fileInputRef} accept="image/*" multiple onChange={handleFileChange} />
                        </label>
                    </div> 

                  {uploadedImages.length > 0 && (
                    <div>
                      <FormLabel>پیش‌نمایش تصاویر ({uploadedImages.length}/8)</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image src={image} alt={`Uploaded image ${index + 1}`} width={150} height={150} className="rounded-md object-cover aspect-square w-full" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                 <div className="text-center py-10 animate-in fade-in-50 zoom-in-95">
                    <Check className="w-16 h-16 text-green-500 mx-auto mb-4 bg-green-100 dark:bg-green-900/50 rounded-full p-2" />
                    <h2 className="text-2xl font-bold mb-2">آگهی شما با موفقیت ثبت شد!</h2>
                    <p className="text-muted-foreground mb-6">آگهی شما پس از تایید توسط مدیران، در سایت نمایش داده خواهد شد.</p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => {
                          form.reset();
                          setUploadedImages([]);
                          setCurrentStep(0);
                        }}>ثبت آگهی جدید</Button>
                        <Link href="/my-ads">
                           <Button variant="outline">مشاهده آگهی‌های من</Button>
                        </Link>
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
                  
                  {currentStep >= steps.length - 1 && (
                     <div></div>
                  )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
