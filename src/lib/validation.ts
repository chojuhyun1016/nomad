export interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  { label: "8자 이상", test: (pw) => pw.length >= 8 },
  { label: "영문 포함", test: (pw) => /[a-zA-Z]/.test(pw) },
  { label: "숫자 포함", test: (pw) => /\d/.test(pw) },
];

export function validatePassword(password: string) {
  return PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));
}
