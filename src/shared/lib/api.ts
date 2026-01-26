import type { AxiosRequestConfig } from "axios";
import axios from "./axios";

// Standardized response shape from server
export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  status: "error";
  statusCode: number;
  message: string | string[];
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

const unwrapResponse = <T>(payload: ApiResponse<T>): ApiSuccessResponse<T> => {
  if (payload.status === "success") {
    return payload;
  }

  throw payload;
};

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<T>> {
  const res = await axios.get<ApiResponse<T>>(url, config);
  return unwrapResponse(res.data);
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<T>> {
  const res = await axios.post<ApiResponse<T>>(url, data, config);
  return unwrapResponse(res.data);
}

export async function apiPut<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<T>> {
  const res = await axios.put<ApiResponse<T>>(url, data, config);
  return unwrapResponse(res.data);
}

export async function apiPatch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<T>> {
  const res = await axios.patch<ApiResponse<T>>(url, data, config);
  return unwrapResponse(res.data);
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<T>> {
  const res = await axios.delete<ApiResponse<T>>(url, config);
  return unwrapResponse(res.data);
}
