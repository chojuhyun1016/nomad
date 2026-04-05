import { renderHook, act } from "@testing-library/react";
import { useLogout } from "@/hooks/useLogout";
import { createClient } from "@/lib/supabase/client";

const refreshMock = vi.fn();
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
    prefetch: vi.fn(),
  }),
}));

const mockedCreateClient = vi.mocked(createClient);

describe("useLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logout 호출 시 signOut과 router.refresh가 호출된다", async () => {
    const signOutMock = vi.fn().mockResolvedValue({});
    mockedCreateClient.mockReturnValue({
      auth: { signOut: signOutMock },
    } as unknown as ReturnType<typeof createClient>);

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(signOutMock).toHaveBeenCalled();
    expect(refreshMock).toHaveBeenCalled();
  });
});
