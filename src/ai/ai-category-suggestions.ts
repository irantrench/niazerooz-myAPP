'use server';

/**
 * @fileOverview Provides AI-powered category suggestions based on a search query.
 *
 * - suggestCategories - A function that takes a search query and returns suggested categories.
 * - CategorySuggestionInput - The input type for the suggestCategories function.
 * - CategorySuggestionOutput - The return type for the suggestCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorySuggestionInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type CategorySuggestionInput = z.infer<typeof CategorySuggestionInputSchema>;

const CategorySuggestionOutputSchema = z.object({
  categories: z.array(
    z.string().describe('A suggested category based on the search query.')
  ).describe('A list of suggested categories relevant to the search query.'),
});
export type CategorySuggestionOutput = z.infer<typeof CategorySuggestionOutputSchema>;

export async function suggestCategories(input: CategorySuggestionInput): Promise<CategorySuggestionOutput> {
  return suggestCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorySuggestionPrompt',
  input: {schema: CategorySuggestionInputSchema},
  output: {schema: CategorySuggestionOutputSchema},
  prompt: `Based on the user's search query, suggest relevant categories.
  The categories should be drawn from these possible options: Real Estate, Services, Products, Jobs, Events, Community, Personals, Vehicles, or Classes.
  Return a JSON array of strings.

  Search Query: {{{query}}}`,
});

const suggestCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestCategoriesFlow',
    inputSchema: CategorySuggestionInputSchema,
    outputSchema: CategorySuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
