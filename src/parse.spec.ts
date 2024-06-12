import { parseInput } from "./parse";

describe("parseInput", () => {
  it("should correctly parse input 1", () => {
    const input =
      "2 book at 12.49\n1 music CD at 14.99\n1 chocolate bar at 0.85";
    const expectedOutput = [
      { quantity: 2, name: "book", price: 1249 },
      { quantity: 1, name: "music CD", price: 1499 },
      { quantity: 1, name: "chocolate bar", price: 85 },
    ];
    const result = parseInput({ input });
    expect(result).toEqual(expectedOutput);
  });

  it("should correctly parse input 2", () => {
    const input =
      "1 imported box of chocolates at 10.00\n1 imported bottle of perfume at 47.50";
    const expectedOutput = [
      { quantity: 1, name: "imported box of chocolates", price: 1000 },
      { quantity: 1, name: "imported bottle of perfume", price: 4750 },
    ];
    const result = parseInput({ input });
    expect(result).toEqual(expectedOutput);
  });

  it("should correctly parse input 3", () => {
    const input =
      "1 imported bottle of perfume at 27.99\n1 bottle of perfume at 18.99\n1 packet of headache pills at 9.75\n3 imported boxes of chocolates at 11.25";
    const expectedOutput = [
      { quantity: 1, name: "imported bottle of perfume", price: 2799 },
      { quantity: 1, name: "bottle of perfume", price: 1899 },
      { quantity: 1, name: "packet of headache pills", price: 975 },
      { quantity: 3, name: "imported boxes of chocolates", price: 1125 },
    ];
    const result = parseInput({ input });
    expect(result).toEqual(expectedOutput);
  });

  it("should throw an error for invalid input", () => {
    const input = "invalid input string";
    expect(() => parseInput({ input })).toThrow("Invalid input format");
  });
});
