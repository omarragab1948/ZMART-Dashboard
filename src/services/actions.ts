import getError from "@/utils/getError";
import api from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Methods = "post" | "put" | "patch" | "delete" | "get";

interface SendRequestProps {
  method: Methods;
  url: string;
  params?: object;
  data?: object;
}

const sendRequest = async ({ method, url, params, data }: SendRequestProps) => {
  try {
    const res = await api.request({
      method,
      url,
      params,
      data,
    });
    return res.data;
  } catch (error) {
    throw getError(error);
  }
};

interface UseWriteRequestProps<T> {
  mutationKey?: string[];
  invalidate?: string[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showToastOnError?: boolean;
  toastSuccessMessage?: string;
}
export function useWriteRequest<T>({
  mutationKey,
  invalidate,
  onSuccess,
  onError,
  showToastOnError,
  toastSuccessMessage,
}: UseWriteRequestProps<T> = {}) {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: sendRequest,
    onSuccess: (data) => {
      invalidate?.forEach((e: string) => {
        queryCLient.invalidateQueries({ queryKey: [e] });
      });
      onSuccess?.(data);
      if (toastSuccessMessage) toast.success(toastSuccessMessage);
    },
    onError: (error) => {
      onError?.(error);
      if (showToastOnError) toast.error(error.message);
    },
  });
}

interface UseReadRequestProps {
  queryKey: string[];
  url: string;
  params?: object;
}

export function useReadRequest({
  queryKey,
  url,
  params,
}: UseReadRequestProps) {
  return useQuery({
    queryKey,
    queryFn: () => sendRequest({ method: "get", url, params }),
   
  });
}
