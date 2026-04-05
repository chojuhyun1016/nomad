import { toSlug } from "@/lib/slug";

describe("toSlug", () => {
  it('"Seoul" → "seoul"', () => {
    expect(toSlug("Seoul")).toBe("seoul");
  });

  it('"Busan City" → "busan-city"', () => {
    expect(toSlug("Busan City")).toBe("busan-city");
  });

  it('"Jeju  Island" (연속 공백) → "jeju-island"', () => {
    expect(toSlug("Jeju  Island")).toBe("jeju-island");
  });

  it('"DAEGU" (대문자) → "daegu"', () => {
    expect(toSlug("DAEGU")).toBe("daegu");
  });

  it('빈 문자열 → ""', () => {
    expect(toSlug("")).toBe("");
  });

  it('"A" (단일 문자) → "a"', () => {
    expect(toSlug("A")).toBe("a");
  });
});
