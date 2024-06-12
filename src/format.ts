import { calculateTax } from "./tax";
import { Product } from "./types";

/**
 * Formats a single receipt item with taxes included.
 *
 * @param {Product} product - The product object containing details like name, quantity, and taxes.
 * @returns {string} - The formatted receipt line for a single product.
 */
export const formatReceiptItem = ({
  name,
  quantity,
  totalPrice,
  totalSalesTax,
  totalImportDuty,
}: Product) => {
  const totalPriceWithTax =
    (totalPrice || 0) + (totalSalesTax || 0) + (totalImportDuty || 0);
  const formattedTotalPrice = (totalPriceWithTax / 100).toFixed(2);
  return `${quantity} ${name}: ${formattedTotalPrice}`;
};

/**
 * Formats the entire receipt for all products including total taxes and total cost.
 *
 * @param {{ products: Product[] }} params - An object containing an array of products.
 * @returns {string} - The complete formatted receipt as a string.
 */
export const formatReceipt = ({ products }: { products: Product[] }) => {
  let totalSalesTaxes = 0;
  let totalCost = 0;

  const receiptLines = products.map((product) => {
    const { salesTax, importDuty } = calculateTax(product);
    totalCost += product.price * product.quantity + salesTax + importDuty;
    totalSalesTaxes += salesTax + importDuty;

    return formatReceiptItem({
      ...product,
    });
  });

  receiptLines.push(`Sales Taxes: ${(totalSalesTaxes / 100).toFixed(2)}`);
  receiptLines.push(`Total: ${(totalCost / 100).toFixed(2)}`);

  return receiptLines.join("\n");
};
