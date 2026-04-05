import { toggleReaction } from "@/app/cities/actions";

const mockSupabase = {
  auth: { getUser: vi.fn() },
  from: vi.fn(),
  rpc: vi.fn(),
};

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => mockSupabase),
}));

function mockFrom() {
  const chain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  };
  mockSupabase.from.mockReturnValue(chain);
  return chain;
}

const CITY_ID = "city-1";
const USER = { id: "user-1" };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("toggleReaction", () => {
  it("미인증 사용자 -> error: unauthenticated", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

    const result = await toggleReaction(CITY_ID, "like");

    expect(result).toEqual({
      likes: 0,
      dislikes: 0,
      userReaction: null,
      error: "unauthenticated",
    });
  });

  it("새 좋아요: INSERT + delta(+1, 0)", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: USER } });

    // 1차 from: 기존 반응 조회 -> null
    const chain1 = mockFrom();
    chain1.single.mockResolvedValueOnce({ data: null, error: null });

    // from 호출 순서별 체이닝 설정
    let fromCallCount = 0;
    mockSupabase.from.mockImplementation(() => {
      fromCallCount++;
      if (fromCallCount === 1) {
        // 기존 반응 조회
        return chain1;
      }
      if (fromCallCount === 2) {
        // INSERT
        return {
          insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }
      // 3번째: 사용자 반응 재조회
      const requery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { reaction_type: "like" },
          error: null,
        }),
      };
      return requery;
    });

    mockSupabase.rpc.mockResolvedValue({
      data: { new_likes: 1, new_dislikes: 0 },
      error: null,
    });

    const result = await toggleReaction(CITY_ID, "like");

    expect(mockSupabase.rpc).toHaveBeenCalledWith("update_city_reaction_counts", {
      p_city_id: CITY_ID,
      p_like_delta: 1,
      p_dislike_delta: 0,
    });
    expect(result).toEqual({ likes: 1, dislikes: 0, userReaction: "like" });
  });

  it("새 싫어요: INSERT + delta(0, +1)", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: USER } });

    let fromCallCount = 0;
    mockSupabase.from.mockImplementation(() => {
      fromCallCount++;
      if (fromCallCount === 1) {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        };
      }
      if (fromCallCount === 2) {
        return {
          insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { reaction_type: "dislike" },
          error: null,
        }),
      };
    });

    mockSupabase.rpc.mockResolvedValue({
      data: { new_likes: 0, new_dislikes: 1 },
      error: null,
    });

    const result = await toggleReaction(CITY_ID, "dislike");

    expect(mockSupabase.rpc).toHaveBeenCalledWith("update_city_reaction_counts", {
      p_city_id: CITY_ID,
      p_like_delta: 0,
      p_dislike_delta: 1,
    });
    expect(result).toEqual({ likes: 0, dislikes: 1, userReaction: "dislike" });
  });

  it("좋아요 토글 off: DELETE + delta(-1, 0)", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: USER } });

    const existingId = "reaction-1";

    let fromCallCount = 0;
    mockSupabase.from.mockImplementation(() => {
      fromCallCount++;
      if (fromCallCount === 1) {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: existingId, reaction_type: "like" },
            error: null,
          }),
        };
      }
      if (fromCallCount === 2) {
        // DELETE
        return {
          delete: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
    });

    mockSupabase.rpc.mockResolvedValue({
      data: { new_likes: 0, new_dislikes: 0 },
      error: null,
    });

    const result = await toggleReaction(CITY_ID, "like");

    expect(mockSupabase.rpc).toHaveBeenCalledWith("update_city_reaction_counts", {
      p_city_id: CITY_ID,
      p_like_delta: -1,
      p_dislike_delta: 0,
    });
    expect(result).toEqual({ likes: 0, dislikes: 0, userReaction: null });
  });

  it("싫어요 토글 off: DELETE + delta(0, -1)", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: USER } });

    const existingId = "reaction-2";

    let fromCallCount = 0;
    mockSupabase.from.mockImplementation(() => {
      fromCallCount++;
      if (fromCallCount === 1) {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: existingId, reaction_type: "dislike" },
            error: null,
          }),
        };
      }
      if (fromCallCount === 2) {
        return {
          delete: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
    });

    mockSupabase.rpc.mockResolvedValue({
      data: { new_likes: 0, new_dislikes: 0 },
      error: null,
    });

    const result = await toggleReaction(CITY_ID, "dislike");

    expect(mockSupabase.rpc).toHaveBeenCalledWith("update_city_reaction_counts", {
      p_city_id: CITY_ID,
      p_like_delta: 0,
      p_dislike_delta: -1,
    });
    expect(result).toEqual({ likes: 0, dislikes: 0, userReaction: null });
  });

  it("좋아요 -> 싫어요: UPDATE + delta(-1, +1)", async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: USER } });

    const existingId = "reaction-3";

    let fromCallCount = 0;
    mockSupabase.from.mockImplementation(() => {
      fromCallCount++;
      if (fromCallCount === 1) {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: existingId, reaction_type: "like" },
            error: null,
          }),
        };
      }
      if (fromCallCount === 2) {
        // UPDATE
        return {
          update: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ data: {}, error: null }),
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: { reaction_type: "dislike" },
          error: null,
        }),
      };
    });

    mockSupabase.rpc.mockResolvedValue({
      data: { new_likes: 0, new_dislikes: 1 },
      error: null,
    });

    const result = await toggleReaction(CITY_ID, "dislike");

    expect(mockSupabase.rpc).toHaveBeenCalledWith("update_city_reaction_counts", {
      p_city_id: CITY_ID,
      p_like_delta: -1,
      p_dislike_delta: 1,
    });
    expect(result).toEqual({ likes: 0, dislikes: 1, userReaction: "dislike" });
  });
});
