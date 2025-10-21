
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Star, TrendingUp, Search } from 'lucide-react';

const mockAnalysisResult = [
  { keyword: 'اجاره هیلتی در تهران', rank: '1-3', competition: 'بالا', potential: 'عالی' },
  { keyword: 'فروش دریل چکشی', rank: '4-7', competition: 'متوسط', potential: 'خوب' },
  { keyword: 'تعمیر ابزار برقی', rank: '2-5', competition: 'بالا', potential: 'عالی' },
  { keyword: 'خرید بتن کن دست دوم', rank: '8-12', competition: 'پایین', potential: 'متوسط' },
  { keyword: 'نمایندگی هیلتی', rank: '1-5', competition: 'بسیار بالا', potential: 'عالی' },
];

export default function GoogleKeywordsPage() {
  const [description, setDescription] = useState('فروش و اجاره انواع ابزارآلات ساختمانی و صنعتی، به خصوص هیلتی و دریل‌های چکشی در تهران. ارائه خدمات تعمیر تخصصی ابزار برقی.');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[]>([]);

  const handleAnalysis = async () => {
    setIsLoading(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAnalysisResult(mockAnalysisResult);
    setIsLoading(false);
  };

  const getCompetitionBadgeVariant = (competition: string) => {
    switch (competition) {
      case 'بالا':
      case 'بسیار بالا':
        return 'destructive';
      case 'متوسط':
        return 'secondary';
      case 'پایین':
        return 'default';
      default:
        return 'outline';
    }
  };
  
    const getPotentialBadgeColor = (potential: string) => {
    switch (potential) {
      case 'عالی':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'خوب':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'متوسط':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };


  return (
    <div className="container mx-auto py-10">
      <Card className="overflow-hidden animate-subtle-float">
        <CardHeader className="bg-card/50 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
                <Wand2 className="w-8 h-8 text-primary" />
            </div>
            <div>
                 <CardTitle className="text-2xl font-headline">تحلیلگر هوشمند کلمات کلیدی گوگل</CardTitle>
                 <CardDescription className="mt-2">
                    کسب و کار خود را توصیف کنید تا هوش مصنوعی بهترین عبارت‌ها برای کسب رتبه در گوگل را به شما پیشنهاد دهد.
                 </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <label htmlFor="business-description" className="text-base font-semibold mb-2 block">
                توضیحات کسب و کار شما
            </label>
            <Textarea
              id="business-description"
              placeholder="مثال: فروشگاه آنلاین لباس زنانه با تمرکز بر طراحی‌های مدرن و کیفیت بالا..."
              className="min-h-[120px] text-base bg-background"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-card/50 p-6">
            <Button onClick={handleAnalysis} disabled={isLoading || !description} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>در حال تحلیل...</span>
                  </>
                ) : (
                  <>
                    <Wand2 />
                    <span>شروع تحلیل هوشمند</span>
                  </>
                )}
            </Button>
        </CardFooter>
      </Card>
      
      {(isLoading || analysisResult.length > 0) && (
        <div className="mt-8">
            <h2 className="text-xl font-headline font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-primary"/>
                نتایج تحلیل کلمات کلیدی
            </h2>
             <Card className="animate-subtle-float" style={{animationDelay: '200ms'}}>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%]">کلمه کلیدی پیشنهادی</TableHead>
                                <TableHead className="text-center">رتبه تخمینی در گوگل</TableHead>
                                <TableHead className="text-center">میزان رقابت</TableHead>
                                <TableHead className="text-center">پتانسیل جستجو</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><div className="h-4 bg-muted rounded-full w-3/4 animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 bg-muted rounded-full w-1/2 mx-auto animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 bg-muted rounded-full w-1/2 mx-auto animate-pulse"></div></TableCell>
                                        <TableCell><div className="h-4 bg-muted rounded-full w-1/2 mx-auto animate-pulse"></div></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                analysisResult.map((result, i) =>(
                                    <TableRow key={i} className="hover:bg-primary/5">
                                        <TableCell className="font-semibold text-foreground">{result.keyword}</TableCell>
                                        <TableCell className="text-center font-mono text-lg">{result.rank}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={getCompetitionBadgeVariant(result.competition)}>{result.competition}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                             <Badge className={cn("border", getPotentialBadgeColor(result.potential))}>
                                                {Array.from({length: result.potential === 'عالی' ? 3 : result.potential === 'خوب' ? 2 : 1}).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                                <span className="mr-1">{result.potential}</span>
                                             </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
        </div>
      )}

    </div>
  );
}
