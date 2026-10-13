import { RegisterFormData, FormErrors } from "./types";

export function validateField(
  field: keyof RegisterFormData,
  value: string,
  form: RegisterFormData
): string {
  switch (field) {
    case "fullName":
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2)
        return "Full name must be at least 2 characters.";
      return "";

    case "email":
      if (!value.trim()) return "Email is required.";

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address.";

      return "";

    case "phone":
      if (!value.trim()) return "Phone number is required.";

      if (!/^\+?[0-9]{9,15}$/.test(value))
        return "Enter a valid phone number.";

      return "";

    case "password":
      if (!value) return "Password is required.";
      if (value.length < 8)
        return "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(value))
        return "Password must contain an uppercase letter.";
      if (!/[a-z]/.test(value))
        return "Password must contain a lowercase letter.";
      if (!/[0-9]/.test(value))
        return "Password must contain a number.";

      return "";

    case "confirmPassword":
      if (!value) return "Please confirm your password.";

      if (value !== form.password)
        return "Passwords do not match.";

      return "";

    default:
      return "";
  }
}

export function validateForm(form: RegisterFormData): FormErrors {
  const errors: FormErrors = {};

  for (const field of Object.keys(form) as Array<keyof RegisterFormData>) {
    const error = validateField(field, form[field], form);

    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}