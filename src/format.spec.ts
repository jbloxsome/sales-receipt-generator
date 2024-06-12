import { formatReceipt, formatReceiptItem } from "./format";
import { Product } from "./types";

describe("formatReceiptItem", () => {
  it("should format a single receipt item correctly", () => {
    const product: Product = {
      name: "music CD",
      quantity: 1,
      price: 1499,
      totalPrice: 1499,
      totalSalesTax: 150,
      totalImportDuty: 0,
    };
    const formattedItem = formatReceiptItem(product);
    expect(formattedItem).toBe("1 music CD: 16.49");
  });
});

describe("formatReceipt", () => {
  it("should format the entire receipt correctly for input 1", () => {
    const products: Product[] = [
      {
        name: "book",
        quantity: 2,
        price: 1249,
        totalPrice: 2498,
        totalSalesTax: 0,
        totalImportDuty: 0,
      },
      {
        name: "music CD",
        quantity: 1,
        price: 1499,
        totalPrice: 1499,
        totalSalesTax: 150,
        totalImportDuty: 0,
      },
      {
        name: "chocolate bar",
        quantity: 1,
        price: 85,
        totalPrice: 85,
        totalSalesTax: 0,
        totalImportDuty: 0,
      },
    ];
    const receipt = formatReceipt({ products });
    expect(receipt).toBe(
      "2 book: 24.98\n1 music CD: 16.49\n1 chocolate bar: 0.85\nSales Taxes: 1.50\nTotal: 42.32"
    );
  });

  it("should format the entire receipt correctly for input 2", () => {
    const products: Product[] = [
      {
        name: "imported box of chocolates",
        quantity: 1,
        price: 1000,
        totalPrice: 1000,
        totalSalesTax: 0,
        totalImportDuty: 50,
      },
      {
        name: "imported bottle of perfume",
        quantity: 1,
        price: 4750,
        totalPrice: 4750,
        totalSalesTax: 475,
        totalImportDuty: 240,
      },
    ];
    const receipt = formatReceipt({ products });
    expect(receipt).toBe(
      "1 imported box of chocolates: 10.50\n1 imported bottle of perfume: 54.65\nSales Taxes: 7.65\nTotal: 65.15"
    );
  });

  it("should format the entire receipt correctly for input 3", () => {
    const products: Product[] = [
      {
        name: "imported bottle of perfume",
        quantity: 1,
        price: 2799,
        totalPrice: 2799,
        totalSalesTax: 280,
        totalImportDuty: 140,
      },
      {
        name: "bottle of perfume",
        quantity: 1,
        price: 1899,
        totalPrice: 1899,
        totalSalesTax: 190,
        totalImportDuty: 0,
      },
      {
        name: "packet of headache pills",
        quantity: 1,
        price: 975,
        totalPrice: 975,
        totalSalesTax: 0,
        totalImportDuty: 0,
      },
      {
        name: "imported boxes of chocolates",
        quantity: 3,
        price: 1125,
        totalPrice: 3375,
        totalSalesTax: 0,
        totalImportDuty: 180,
      },
    ];
    const receipt = formatReceipt({ products });
    expect(receipt).toBe(
      "1 imported bottle of perfume: 32.19\n1 bottle of perfume: 20.89\n1 packet of headache pills: 9.75\n3 imported boxes of chocolates: 35.55\nSales Taxes: 7.90\nTotal: 98.38"
    );
  });
});
