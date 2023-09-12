import { useEffect, useState } from 'react';
import { APIError } from '../api/common';

type FetchFn<T> = () => Promise<T>;
type Props<T> = { onSuccess?: (data: T) => void };

export const useMutation = <T>({ onSuccess }: Props<T>) => {
  const [error, setError] = useState<APIError | null>(null);

  const mutate = async (fetchFn: FetchFn<T>) => {
    try {
      const data: T = await fetchFn();

      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (error instanceof APIError) setError(error);
      if (error instanceof Error) throw error;
    }
  };

  const clearError = () => setError(null);

  return { mutate, error, clearError };
};

export const useMutationWithFailErrorBoundary = <T>({
  onSuccess,
}: Props<T>) => {
  const mutate = async (fetchFn: FetchFn<T>) => {
    const data = (await fetchFn()) as T;

    if (onSuccess) onSuccess(data);
  };

  return { mutate };
};

export const useMutationWithSuccessErrorBoundary = <T>({
  onSuccess,
}: Props<T>) => {
  const [error, setError] = useState<APIError | null>(null);

  const mutate = async (fetchFn: FetchFn<T>) => {
    try {
      const data = (await fetchFn()) as T;

      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (error instanceof APIError) setError(error);
      if (error instanceof Error) throw error;
    }
  };

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { mutate };
};
