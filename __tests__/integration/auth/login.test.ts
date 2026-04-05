import { login } from "@/app/login/actions";

const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
  },
};

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => mockSupabase),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("login", () => {
  function makeFormData(email: string, password: string) {
    const fd = new FormData();
    fd.set("email", email);
    fd.set("password", password);
    return fd;
  }

  it("로그인 성공 -> { success: true }", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    const result = await login(null, makeFormData("test@test.com", "Pass1234"));

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "Pass1234",
    });
    expect(result).toEqual({ success: true });
  });

  it("로그인 실패 -> { error: message }", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      error: { message: "Invalid login credentials" },
    });

    const result = await login(null, makeFormData("bad@test.com", "wrong"));

    expect(result).toEqual({ error: "Invalid login credentials" });
  });
});
