import { register } from "@/app/register/actions";

const mockSupabase = {
  auth: {
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
};

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => mockSupabase),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("register", () => {
  function makeFormData(email: string, password: string, name: string) {
    const fd = new FormData();
    fd.set("email", email);
    fd.set("password", password);
    fd.set("name", name);
    return fd;
  }

  it("회원가입 성공 -> signOut 호출 + { success: true }", async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { identities: [{ id: "1" }] } },
      error: null,
    });
    mockSupabase.auth.signOut.mockResolvedValue({ error: null });

    const result = await register(null, makeFormData("test@test.com", "Pass1234", "홍길동"));

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "Pass1234",
      options: { data: { display_name: "홍길동" } },
    });
    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  it("중복 이메일 -> { error: '이미 등록된 이메일입니다.' }", async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { identities: [] } },
      error: null,
    });

    const result = await register(null, makeFormData("dup@test.com", "Pass1234", "홍길동"));

    expect(result).toEqual({ error: "이미 등록된 이메일입니다." });
    expect(mockSupabase.auth.signOut).not.toHaveBeenCalled();
  });

  it("서버 오류 -> { error: message }", async () => {
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: null },
      error: { message: "Database error" },
    });

    const result = await register(null, makeFormData("err@test.com", "Pass1234", "홍길동"));

    expect(result).toEqual({ error: "Database error" });
    expect(mockSupabase.auth.signOut).not.toHaveBeenCalled();
  });
});
