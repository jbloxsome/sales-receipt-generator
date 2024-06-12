import { Product } from "./types";

const MATCHER = /(\d+) ([\w\s]+) at (\d+\.\d{2})/;

/**
 * Parses the input string to extract product details and returns an array of Product objects.
 * Each line in the input string should match the pattern: "<quantity> <product name> at <price>".
 * If a line does not match the expected format, an error is thrown.
 *
 * @param {object} params - The parameters object.
 * @param {string} params.input - The input string containing product details.
 * @returns {Product[]} An array of Product objects.
 */
export const parseInput = ({ input }: { input: string }): Product[] => {
  const lines = input.split("\n");
  const products = [];

  for (const line of lines) {
    const match = line.match(MATCHER);
    if (match) {
      const quantity = parseInt(match[1], 10);
      const name = match[2].trim();
      const price = Math.round(parseFloat(match[3]) * 100);
      products.push({ quantity, name, price });
    } else {
      throw new Error("Invalid input format");
    }
  }

  return products;
};
