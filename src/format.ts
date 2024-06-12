import { calculateTax } from "./tax";
import { Product } from "./types";

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

export const formatReceipt = ({ products }: { products: Product[] }) => {
  let totalSalesTaxes = 0;
  let totalCost = 0;

  const receiptLines = products.map((product) => {
    const { salesTax, importDuty } = calculateTax(product);
    const totalPrice = product.price * product.quantity + salesTax + importDuty;
    totalCost += totalPrice;
    totalSalesTaxes += salesTax + importDuty;

    return formatReceiptItem({
      ...product,
      totalPrice,
    });
  });

  receiptLines.push(`Sales Taxes: ${(totalSalesTaxes / 100).toFixed(2)}`);
  receiptLines.push(`Total: ${(totalCost / 100).toFixed(2)}`);

  return receiptLines.join("\n");
};
