import { Product } from "./types";

const MATCHER = /(\d+) ([\w\s]+) at (\d+\.\d{2})/;

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
