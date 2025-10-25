'use client';

import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, Camera, Check, DollarSign, List, FileText, Loader2, Upload, X } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CategoryBrowser from '@/components/category-browser';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/firebase/client';
import type { Ad } from '@/lib/types';
import StepIcon from '@/components/StepIcon';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const adSchema = z.object({
  category: z.string().min(1, 'انتخاب دسته‌بندی الزامی است.'),
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد.').max(100, 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد.'),
  description: z.string().min(20, 'توضیحات باید حداقل ۲۰ کاراکتر باشد.'),
  priceType: z.enum(['fixed', 'negotiable', 'free'], { required_error: 'نوع قیمت را مشخص کنید' }),
  price: z.string().optional(),
  images: z.array(z.string())
    .optional()
    .refine((files) => {
      if (!files) {
        return true;
      }
      return files.length <= 8;
    }, "حداکثر 8 تصویر می‌توانید انتخاب کنید.")
    .refine((files) => {
      if (!files) {
        return true;
      }
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.length > MAX_FILE_SIZE) {
          return false;
        }
        
        const fileType = file.substring("data:".length, file.indexOf(";base64"));
        if (!ACCEPTED_IMAGE_TYPES.includes(fileType)) {
          return false;
        }
      }
      return true;
    }, "فرمت تصاویر باید PNG, JPG, JPEG, GIF باشد و حجم آن‌ها کمتر از 5 مگابایت باشد.")
});


type AdFormValues = z.infer<typeof adSchema>;

const steps = [
  { id: 'category', title: 'انتخاب دسته‌بندی', icon: 'List' },
  { id: 'details', title: 'جزئیات آگهی', icon: 'FileText' },
  { id: 'pricing', title: 'قیمت‌گذاری', icon: 'DollarSign' },
  { id: 'media', title: 'تصاویر', icon: 'Camera' },
  { id: 'finish', title: 'پایان', icon: 'Check' },
];

export default function PostAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const adId = searchParams.get('edit');

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

  useEffect(() => {
    const fetchAdData = async () => {
      if (adId) {
        setIsLoading(true);
        setIsEditMode(true);
        try {
          const adDocRef = doc(db, 'ads', adId);
          const adDoc = await getDoc(adDocRef);
          if (adDoc.exists()) {
            const adData = adDoc.data() as Ad;
            form.setValue('category', adData.category);
            form.setValue('title', adData.title);
            form.setValue('description', adData.description);
            form.setValue('priceType', adData.priceType);
            form.setValue('price', adData.price ? String(adData.price) : '');
            setUploadedImages(adData.images || []);
            form.setValue('images', adData.images || []);
          } else {
            toast({ variant: 'destructive', title: 'آگهی یافت نشد', description: 'آگهی مورد نظر برای ویرایش پیدا نشد.' });
            router.push('/my-ads');
          }
        } catch (error) {
          console.error('Error fetching ad data:', error);
          toast({ variant: 'destructive', title: 'خطا', description: 'مشکلی در دریافت اطلاعات آگهی پیش آمده است.' });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAdData();
  }, [adId, form, router, toast]);

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
  }

  if (!user) {
    toast({ title: "نیاز به ورود", description: "برای ثبت آگهی، لطفا ابتدا وارد حساب کاربری خود شوید.", variant: "destructive" });
    router.push('/login');
    return null;
  }

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
        break;
      case 3:
        isValid = await form.trigger('images');
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
    if (!user) {
        toast({ variant: 'destructive', title: 'خطا', description: 'برای ثبت آگهی باید وارد شده باشید.' });
        return;
    }
    setIsLoading(true);
    
    try {
        const imageUrls: string[] = [];
        // Upload images to Firebase Storage
        for (const image of uploadedImages) {
            const imageName = `${user.uid}-${Date.now()}-${Math.random()}`;
            const storageRef = ref(storage, `ads/${imageName}`);
            const uploadResult = await uploadString(storageRef, image, 'data_url');
            const downloadUrl = await getDownloadURL(uploadResult.ref);
            imageUrls.push(downloadUrl);
        }

        const adData = {
          ...data,
          price: data.priceType === 'fixed' ? Number(data.price) : 0,
          images: imageUrls,
          userId: user.uid,
          userDisplayName: user.displayName || user.email,
          status: 'active', // or 'pending' for review
        };

        if (isEditMode && adId) {
          await updateDoc(doc(db, 'ads', adId), {
            ...adData,
            updatedAt: serverTimestamp(),
          });
          toast({ title: "آگهی با موفقیت ویرایش شد", description: "آگهی شما با موفقیت ویرایش شد."});
        } else {
          await addDoc(collection(db, 'ads'), {
            ...adData,
            createdAt: serverTimestamp(),
          });
          toast({ title: "آگهی با موفقیت ثبت شد", description: "آگهی شما اکنون در لیست آگهی‌ها قابل مشاهده است."});
        }

        setIsLoading(false);
        setCurrentStep(steps.length - 1);
        router.push('/my-ads');
    } catch (error: any) {
        setIsLoading(false);
        console.error("Error submitting ad:", error);
        let errorMessage = 'مشکلی در ثبت آگهی پیش آمده است.';
        if (error.code === 'storage/unauthorized') {
          errorMessage = 'شما مجوز کافی برای آپلود تصاویر ندارید.';
        } else if (error.code === 'storage/canceled') {
          errorMessage = 'آپلود تصاویر لغو شد.';
        } else if (error.code === 'storage/unknown') {
          errorMessage = 'مشکلی در آپلود تصاویر پیش آمده است. لطفا دوباره تلاش کنید.';
        }
        toast({ variant: 'destructive', title: 'خطا در ثبت آگهی', description: errorMessage });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        const currentImageCount = uploadedImages.length;
        if (currentImageCount >= 8) {
            toast({ variant: 'destructive', title: 'محدودیت تعداد تصاویر', description: `شما به حداکثر تعداد (۸) تصویر رسیده‌اید.` });
            return;
        }

        const filesToProcess = Array.from(files).slice(0, 8 - currentImageCount);
        
        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
            if (e.target?.result) {
                const result = e.target.result as string;
                setUploadedImages(prev => [...prev, result]);
                form.setValue('images', [...uploadedImages, result]);
            }
            };
            reader.readAsDataURL(file);
        });
    }
  };


  const removeImage = (index: number) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
    form.setValue('images', newUploadedImages);
  };

  const progress = ((currentStep) / (steps.length - 2)) * 100;

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto shadow-deep-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-2">
            <StepIcon step={steps[currentStep]} />
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
                              <Input type="number" dir="ltr" placeholder="5000000" {...field} />
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
                          {isEditMode ? 'در حال ویرایش...' : 'در حال ثبت...'}
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          {isEditMode ? 'ویرایش نهایی آگهی' : 'ثبت نهایی آگهی'}
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
