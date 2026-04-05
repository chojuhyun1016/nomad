import { cn } from "@/lib/utils";

describe("cn", () => {
  it("기본 클래스 조합", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("undefined 제거", () => {
    expect(cn("px-2", undefined, "py-1")).toBe("px-2 py-1");
  });

  it("false 제거", () => {
    expect(cn("px-2", false && "hidden", "py-1")).toBe("px-2 py-1");
  });

  it("Tailwind 충돌 병합: px-2 + px-4 → px-4", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("빈 입력 → 빈 문자열", () => {
    expect(cn()).toBe("");
  });
});
