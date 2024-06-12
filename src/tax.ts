import { Product } from "./types";

const BASIC_SALES_TAX = 0.1;
const IMPORT_DUTY_TAX = 0.05;

const exemptions = ["book", "chocolate", "pills"];

/**
 * Rounds up a given value to the nearest 5 cents.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.value - The value to be rounded up.
 * @returns {number} - The value rounded up to the nearest 5 cents.
 */
export const roundUpToNearest5 = ({ value }: { value: number }) =>
  Math.ceil(value / 5) * 5;

/**
 * Calculates the sales tax and import duty for a given product.
 *
 * @param {Product} product - The product for which to calculate the taxes.
 * @returns {Object} - An object containing the sales tax and import duty.
 * @returns {number} salesTax - The calculated sales tax.
 * @returns {number} importDuty - The calculated import duty.
 */
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
