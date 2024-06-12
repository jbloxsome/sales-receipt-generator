import { Product } from "./types";

const BASIC_SALES_TAX = 0.1;
const IMPORT_DUTY_TAX = 0.05;

const exemptions = ["book", "chocolate", "pills"];

export const roundUpToNearest5 = ({ value }: { value: number }) =>
  Math.ceil(value / 5) * 5;

export function calculateTax({ name, price, quantity }: Product): {
  salesTax: number;
  importDuty: number;
} {
  let basicTax = 0;
  let importDuty = 0;

  if (!exemptions.some((exemptItem) => name.includes(exemptItem))) {
    basicTax = price * BASIC_SALES_TAX;
    // Round up basic tax to the nearest 5 cents
    basicTax = roundUpToNearest5({ value: basicTax });
  }

  if (name.includes("imported")) {
    importDuty = price * IMPORT_DUTY_TAX;
    // Round up import duty to the nearest 5 cents
    importDuty = roundUpToNearest5({ value: importDuty });
  }

  return { salesTax: basicTax * quantity, importDuty: importDuty * quantity };
}
