import { renderHook, act } from "@testing-library/react";
import { useReaction } from "@/hooks/useReaction";
import { toggleReaction } from "@/app/cities/actions";

vi.mock("@/app/cities/actions", () => ({
  toggleReaction: vi.fn(),
}));

const mockedToggleReaction = vi.mocked(toggleReaction);

function defaultOptions() {
  return {
    cityId: "city-1",
    initialLikes: 10,
    initialDislikes: 5,
    initialReaction: null as "like" | "dislike" | null,
  };
}

describe("useReaction", () => {
  beforeEach(() => {
    mockedToggleReaction.mockResolvedValue({
      likes: 0,
      dislikes: 0,
      userReaction: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("초기값이 정상 설정된다", () => {
    const { result } = renderHook(() =>
      useReaction({ cityId: "city-1", initialLikes: 10, initialDislikes: 5, initialReaction: "like" })
    );

    expect(result.current.likes).toBe(10);
    expect(result.current.dislikes).toBe(5);
    expect(result.current.reaction).toBe("like");
  });

  it("null -> like 클릭: likes+1, reaction='like' (낙관적)", () => {
    const { result } = renderHook(() => useReaction(defaultOptions()));

    act(() => {
      result.current.handleLike();
    });

    expect(result.current.likes).toBe(11);
    expect(result.current.reaction).toBe("like");
  });

  it("null -> dislike 클릭: dislikes+1, reaction='dislike' (낙관적)", () => {
    const { result } = renderHook(() => useReaction(defaultOptions()));

    act(() => {
      result.current.handleDislike();
    });

    expect(result.current.dislikes).toBe(6);
    expect(result.current.reaction).toBe("dislike");
  });

  it("like -> like 토글: likes-1, reaction=null", () => {
    const { result } = renderHook(() =>
      useReaction({ ...defaultOptions(), initialReaction: "like" })
    );

    act(() => {
      result.current.handleLike();
    });

    expect(result.current.likes).toBe(9);
    expect(result.current.reaction).toBeNull();
  });

  it("dislike -> dislike 토글: dislikes-1, reaction=null", () => {
    const { result } = renderHook(() =>
      useReaction({ ...defaultOptions(), initialReaction: "dislike" })
    );

    act(() => {
      result.current.handleDislike();
    });

    expect(result.current.dislikes).toBe(4);
    expect(result.current.reaction).toBeNull();
  });

  it("like -> dislike 전환: likes-1, dislikes+1", () => {
    const { result } = renderHook(() =>
      useReaction({ ...defaultOptions(), initialReaction: "like" })
    );

    act(() => {
      result.current.handleDislike();
    });

    expect(result.current.likes).toBe(9);
    expect(result.current.dislikes).toBe(6);
    expect(result.current.reaction).toBe("dislike");
  });

  it("dislike -> like 전환: likes+1, dislikes-1", () => {
    const { result } = renderHook(() =>
      useReaction({ ...defaultOptions(), initialReaction: "dislike" })
    );

    act(() => {
      result.current.handleLike();
    });

    expect(result.current.likes).toBe(11);
    expect(result.current.dislikes).toBe(4);
    expect(result.current.reaction).toBe("like");
  });
});
