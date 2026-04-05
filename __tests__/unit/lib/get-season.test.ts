import { getCurrentSeason } from "@/lib/get-season";

describe("getCurrentSeason", () => {
  it.each([
    [3, "spring"],
    [4, "spring"],
    [5, "spring"],
  ])("month %i → %s", (month, expected) => {
    expect(getCurrentSeason(month)).toBe(expected);
  });

  it.each([
    [6, "summer"],
    [7, "summer"],
    [8, "summer"],
  ])("month %i → %s", (month, expected) => {
    expect(getCurrentSeason(month)).toBe(expected);
  });

  it.each([
    [9, "fall"],
    [10, "fall"],
    [11, "fall"],
  ])("month %i → %s", (month, expected) => {
    expect(getCurrentSeason(month)).toBe(expected);
  });

  it.each([
    [12, "winter"],
    [1, "winter"],
    [2, "winter"],
  ])("month %i → %s", (month, expected) => {
    expect(getCurrentSeason(month)).toBe(expected);
  });

  describe("경계값", () => {
    it("month 0 → winter (범위 밖)", () => {
      expect(getCurrentSeason(0)).toBe("winter");
    });

    it("month 13 → winter (범위 밖)", () => {
      expect(getCurrentSeason(13)).toBe("winter");
    });
  });
});
