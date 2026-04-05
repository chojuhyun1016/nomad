import { test, expect } from "@playwright/test";

test.describe("홈페이지 기본 검증", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("로고가 존재한다", async ({ page }) => {
    const logo = page.locator("header").getByText("🇰🇷 Korea Nomad");
    await expect(logo).toBeVisible();
  });

  test("도시 카드들이 존재한다", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "도시 리스트" });
    await expect(heading).toBeVisible();

    const cards = page.locator("#cities [data-slot='card']");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("처음 접속하면 필터가 전체로 설정되어 있다", async ({ page }) => {
    const filterBar = page.locator(".sticky");
    const selects = filterBar.getByRole("combobox");

    const count = await selects.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await expect(selects.nth(i)).toHaveText(/전체/);
    }
  });

  test("필터 미적용 시 DB의 모든 도시가 카드로 나열된다", async ({ page }) => {
    const cards = page.locator("#cities [data-slot='card']");
    const count = await cards.count();

    // DB에 12개 도시가 시드되어 있음
    expect(count).toBe(12);

    // 일부 도시명이 실제로 표시되는지 확인
    await expect(page.getByRole("heading", { name: "서울", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "제주", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "부산", level: 3 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "대구", level: 3 })).toBeVisible();
  });
});
