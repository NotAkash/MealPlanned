'use server';

/**
 * @fileOverview Summarizes restaurant reviews using a generative AI model.
 *
 * - summarizeRestaurantReviews - A function that takes restaurant reviews as input and returns a concise summary of the reviews.
 * - SummarizeRestaurantReviewsInput - The input type for the summarizeRestaurantReviews function.
 * - SummarizeRestaurantReviewsOutput - The return type for the summarizeRestaurantReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRestaurantReviewsInputSchema = z.object({
  restaurantName: z.string().describe('The name of the restaurant.'),
  reviews: z.array(z.string()).describe('An array of restaurant reviews.'),
});

export type SummarizeRestaurantReviewsInput = z.infer<
  typeof SummarizeRestaurantReviewsInputSchema
>;

const SummarizeRestaurantReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the restaurant reviews.'),
});

export type SummarizeRestaurantReviewsOutput = z.infer<
  typeof SummarizeRestaurantReviewsOutputSchema
>;

export async function summarizeRestaurantReviews(
  input: SummarizeRestaurantReviewsInput
): Promise<SummarizeRestaurantReviewsOutput> {
  return summarizeRestaurantReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRestaurantReviewsPrompt',
  input: {schema: SummarizeRestaurantReviewsInputSchema},
  output: {schema: SummarizeRestaurantReviewsOutputSchema},
  prompt: `Summarize the following reviews for {{restaurantName}}:\n\n{{#each reviews}}\n- {{{this}}}\n{{/each}}\n\nProvide a concise summary of the reviews, highlighting the overall sentiment and key points.`,
});

const summarizeRestaurantReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeRestaurantReviewsFlow',
    inputSchema: SummarizeRestaurantReviewsInputSchema,
    outputSchema: SummarizeRestaurantReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
