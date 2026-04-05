import { validatePassword } from "@/lib/validation";

describe("validatePassword", () => {
  it('"Pass1234" — 모든 규칙 통과', () => {
    const results = validatePassword("Pass1234");
    expect(results.every((r) => r.passed)).toBe(true);
  });

  it('"Pass123" — 8자 미만 실패', () => {
    const results = validatePassword("Pass123");
    expect(results.find((r) => r.label === "8자 이상")?.passed).toBe(false);
    expect(results.find((r) => r.label === "영문 포함")?.passed).toBe(true);
    expect(results.find((r) => r.label === "숫자 포함")?.passed).toBe(true);
  });

  it('"Password" — 숫자 없음 실패', () => {
    const results = validatePassword("Password");
    expect(results.find((r) => r.label === "8자 이상")?.passed).toBe(true);
    expect(results.find((r) => r.label === "영문 포함")?.passed).toBe(true);
    expect(results.find((r) => r.label === "숫자 포함")?.passed).toBe(false);
  });

  it('"12345678" — 영문 없음 실패', () => {
    const results = validatePassword("12345678");
    expect(results.find((r) => r.label === "8자 이상")?.passed).toBe(true);
    expect(results.find((r) => r.label === "영문 포함")?.passed).toBe(false);
    expect(results.find((r) => r.label === "숫자 포함")?.passed).toBe(true);
  });

  it('"" — 모든 규칙 실패', () => {
    const results = validatePassword("");
    expect(results.every((r) => !r.passed)).toBe(true);
  });
});
