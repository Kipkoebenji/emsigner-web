export type RegisterFormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type FormErrors = Partial<Record<keyof RegisterFormData, string>>;