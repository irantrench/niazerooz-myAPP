"use server";

// This is a mock implementation of an AI-powered category suggestion feature.
// In a real-world scenario, this would involve a call to a GenAI model.

// A small delay to simulate network latency.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCategorySuggestions(query: string): Promise<string[]> {
  await sleep(300);

  const lowerCaseQuery = query.toLowerCase();

  if (!lowerCaseQuery.trim()) {
    return [];
  }

  const suggestions: { [key: string]: string[] } = {
    car: ["Vehicles", "Auto Parts"],
    apartment: ["Real Estate", "Rentals"],
    house: ["Real-Estate", "For Sale"],
    developer: ["Jobs", "Services", "IT & Tech"],
    iphone: ["Electronics", "For Sale", "Mobile Phones"],
    sofa: ["Furniture", "For Sale", "Home & Garden"],
    "web design": ["Services", "Jobs", "Marketing"],
  };

  for (const keyword in suggestions) {
    if (lowerCaseQuery.includes(keyword)) {
      return suggestions[keyword];
    }
  }

  // Default fallback suggestions if no keywords match
  if (query.length > 2) {
    return ["For Sale", "Services"];
  }

  return [];
}
