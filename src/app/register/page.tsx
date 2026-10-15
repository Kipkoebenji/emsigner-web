"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/features/auth/hooks/use-register";
import { RegisterFormData, FormErrors } from "@/features/auth/types";
import { validateField, validateForm } from "@/features/auth/utils";

const initialForm: RegisterFormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const [form, setForm] = useState<RegisterFormData>(initialForm);

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<
    Partial<Record<keyof RegisterFormData, boolean>>
  >({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const serverError =
    registerMutation.error?.response?.data?.message ??
    (registerMutation.error ? "Registration failed. Please try again." : "");

  const handleChange = (
    field: keyof RegisterFormData,
    value: string
  ) => {
    const updatedForm = {
      ...form,
      [field]: value,
    };

    setForm(updatedForm);

    // Validate immediately after the field has been touched.
    if (touched[field]) {
      const error = validateField(field, value, updatedForm);

      setErrors((previous) => ({
        ...previous,
        [field]: error || undefined,
      }));
    }

    // Password changes can make confirmPassword invalid.
    if (field === "password" && touched.confirmPassword) {
      const confirmPasswordError = validateField(
        "confirmPassword",
        updatedForm.confirmPassword,
        updatedForm
      );

      setErrors((previous) => ({
        ...previous,
        confirmPassword: confirmPasswordError || undefined,
      }));
    }
  };

  const handleBlur = (field: keyof RegisterFormData) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

    const error = validateField(field, form[field], form);

    setErrors((previous) => ({
      ...previous,
      [field]: error || undefined,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    registerMutation.reset();

    // Validate everything before submitting.
    const validationErrors = validateForm(form);

    setErrors(validationErrors);

    // Mark every field as touched.
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    registerMutation.mutate(
      {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: () => {
          setForm(initialForm);
          setErrors({});
          setTouched({});
          router.push("/login");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Create your account</h1>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName">Full name</label>

        <input
          id="fullName"
          type="text"
          value={form.fullName}
          onChange={(event) =>
            handleChange("fullName", event.target.value)
          }
          onBlur={() => handleBlur("fullName")}
          placeholder="John Doe"
        />

        {touched.fullName && errors.fullName && (
          <p>{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) =>
            handleChange("email", event.target.value)
          }
          onBlur={() => handleBlur("email")}
          placeholder="john@example.com"
        />

        {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone">Phone number</label>

        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) =>
            handleChange("phone", event.target.value)
          }
          onBlur={() => handleBlur("phone")}
          placeholder="+254712345678"
        />

        {touched.phone && errors.phone && (
          <p>{errors.phone}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password">Password</label>

        <div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) =>
              handleChange("password", event.target.value)
            }
            onBlur={() => handleBlur("password")}
            placeholder="Enter your password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {touched.password && errors.password && (
          <p>{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword">
          Confirm password
        </label>

        <div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(event) =>
              handleChange(
                "confirmPassword",
                event.target.value
              )
            }
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="Confirm your password"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((previous) => !previous)
            }
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {touched.confirmPassword && errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && <p>{serverError}</p>}

      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}