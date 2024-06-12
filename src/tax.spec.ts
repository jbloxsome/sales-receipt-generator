import { calculateTax, roundUpToNearest5 } from "./tax";
import { Product } from "./types";

describe("roundUpToNearest5", () => {
  it("should round up to the nearest 5", () => {
    expect(roundUpToNearest5({ value: 123 })).toEqual(125);
    expect(roundUpToNearest5({ value: 112.5 })).toEqual(115);
    expect(roundUpToNearest5({ value: 101.2 })).toEqual(105);
    expect(roundUpToNearest5({ value: 100 })).toEqual(100);
  });
});

describe("calculateTax", () => {
  it("should calculate tax for a book which is exempt", () => {
    const product: Product = { name: "book", price: 1249, quantity: 2 };
    expect(calculateTax(product)).toEqual({ salesTax: 0, importDuty: 0 });
  });

  it("should calculate tax for a music CD with basic sales tax", () => {
    const product: Product = { name: "music CD", price: 1499, quantity: 1 };
    expect(calculateTax(product)).toEqual({
      salesTax: 150,
      importDuty: 0,
    });
  });

  it("should calculate tax for a chocolate bar which is exempt", () => {
    const product: Product = {
      name: "chocolate bar",
      price: 85,
      quantity: 1,
    };
    expect(calculateTax(product)).toEqual({ salesTax: 0, importDuty: 0 });
  });

  it("should calculate tax for imported box of chocolates with only import duty", () => {
    const product: Product = {
      name: "imported box of chocolates",
      price: 1000,
      quantity: 1,
    };
    expect(calculateTax(product)).toEqual({
      salesTax: 0,
      importDuty: 50,
    });
  });

  it("should calculate tax for imported bottle of perfume with both taxes", () => {
    const product: Product = {
      name: "imported bottle of perfume",
      price: 4750,
      quantity: 1,
    };
    expect(calculateTax(product)).toEqual({ salesTax: 475, importDuty: 240 });
  });

  it("should calculate tax for a packet of headache pills which is exempt", () => {
    const product: Product = {
      name: "packet of headache pills",
      price: 975,
      quantity: 1,
    };
    expect(calculateTax(product)).toEqual({ salesTax: 0, importDuty: 0 });
  });

  it("should calculate tax for imported boxes of chocolates with only import duty", () => {
    const product: Product = {
      name: "imported boxes of chocolates",
      price: 1125,
      quantity: 3,
    };
    expect(calculateTax(product)).toEqual({
      salesTax: 0,
      importDuty: 180,
    });
  });
});
