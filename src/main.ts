import { parseInput } from "./parse";
import { calculateTax } from "./tax";
import { formatReceipt } from "./format";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { readdirSync } from "fs";

const inputFiles = readdirSync(join(__dirname, "../inputs"));

inputFiles.forEach((file) => {
  const inputPath = join(__dirname, "../inputs", file);
  const inputContent = readFileSync(inputPath, "utf-8");
  const products = parseInput({ input: inputContent });

  const productsWithTax = products.map((product) => {
    const { salesTax, importDuty } = calculateTax(product);
    return {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      totalSalesTax: salesTax,
      totalImportDuty: importDuty,
      totalPrice: product.price * product.quantity,
    };
  });

  const receipt = formatReceipt({ products: productsWithTax });

  const outputPath = join(__dirname, "../outputs", `${file}-receipt.txt`);

  writeFileSync(outputPath, `Receipt for ${file}:\n${receipt}\n`);
});
