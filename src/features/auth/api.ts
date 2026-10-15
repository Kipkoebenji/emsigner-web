import type { AxiosError } from "axios";
import api from "@/service/api";

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type RegisteredUser = {
  id: string;
  fullName: string;
  email: string;
  role: string | null;
};

export type RegisterResponse = {
  user: RegisteredUser;
  accessToken: string;
};

export type RegisterErrorResponse = {
  message: string;
};

export type RegisterApiError = AxiosError<RegisterErrorResponse>;

export async function registerUser(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>(
    "/api/auth/register",
    request,
  );

  return data;
}
