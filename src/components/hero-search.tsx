"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, MapPin, Sparkles } from "lucide-react";
import { getCategorySuggestions } from "@/app/actions";

// Debounce hook to limit API calls
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchSuggestions = useCallback((searchQuery: string) => {
    startTransition(async () => {
      const result = await getCategorySuggestions(searchQuery);
      setSuggestions(result);
    });
  }, []);

  useEffect(() => {
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
              Find what you need, <span className="text-primary">when you need it</span>.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              The modern marketplace for your local community. Search for items, services, jobs and more.
            </p>
          </div>
          <div className="w-full max-w-3xl space-y-4">
            <form className="grid sm:grid-cols-[1fr_auto_auto] gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="e.g. 'used bicycle' or 'web developer'"
                  className="w-full pl-10 h-12 text-base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Select defaultValue="tehran">
                  <SelectTrigger className="w-full sm:w-[180px] h-12 text-base">
                    <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tehran">Tehran</SelectItem>
                    <SelectItem value="shiraz">Shiraz</SelectItem>
                    <SelectItem value="isfahan">Isfahan</SelectItem>
                    <SelectItem value="mashhad">Mashhad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="h-12 w-full sm:w-auto text-base">
                Search
              </Button>
            </form>
            <div className="h-8 flex items-center justify-center gap-2 flex-wrap">
              {isPending ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Finding best categories...</span>
                </div>
              ) : (
                suggestions.length > 0 && (
                  <>
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground mr-1">Suggested:</span>
                    {suggestions.map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
