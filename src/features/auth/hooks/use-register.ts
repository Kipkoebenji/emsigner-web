import { useMutation } from "@tanstack/react-query";
import type { RegisterApiError, RegisterRequest, RegisterResponse } from "../api";
import { registerUser } from "../api";

export function useRegister() {
  return useMutation<RegisterResponse, RegisterApiError, RegisterRequest>({
    mutationFn: registerUser,
  });
}
