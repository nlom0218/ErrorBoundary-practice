import { useEffect, useState } from 'react';
import { APIError } from '../api/common';

const useErrorBoundary = <T>(fetchFn: () => Promise<T>) => {
  const [error, setError] = useState<APIError | null>(null);
  try {
    fetchFn();
  } catch (error) {
    if (error instanceof APIError) setError(error);
  }
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
};

export default useErrorBoundary;
