"use client";

import { Search, Tags, SlidersHorizontal, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { suggestCategories } from "@/ai/ai-category-suggestions";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          const result = await suggestCategories({ query });
          setSuggestions(result.categories);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://static.niazerooz.com/content/images/logo/new/niazerooz-com-logo-light.png"
            alt="Niazerooz Logo"
            width={100}
            height={40}
            className="h-10 w-auto object-contain"
          />
           <Link href="/city">
             <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground">
                <MapPin className="ml-2 h-4 w-4" />
                تهران
              </Button>
           </Link>
        </div>
        <div className="flex-grow relative" ref={suggestionBoxRef}>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="جستجو در همه آگهی ها..."
              className="w-full rounded-full border-2 border-input bg-card/50 py-2 pr-10 pl-4 h-12 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-inner"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
            />
            {loading && <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />}
          </div>
          {showSuggestions && (suggestions.length > 0 || loading) && (
            <div className="absolute top-full mt-2 w-full rounded-md border bg-popover/80 backdrop-blur-xl shadow-lg z-50">
              <div className="p-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2 px-2">
                  <Tags className="h-4 w-4" />
                  <span>دسته بندی های پیشنهادی</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loading && query.length > 2 ? (
                     <div className="w-full flex justify-center items-center p-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                     </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <button key={index} className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors">
                        {suggestion}
                      </button>
                    ))
                  )}
                </div>
                 <div className="border-t my-2"></div>
                 <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary">
                    <SlidersHorizontal className="ml-2 h-4 w-4" />
                    جستجوی پیشرفته
                 </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
