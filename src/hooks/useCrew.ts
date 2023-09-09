import { useEffect } from 'react';
import useQuery from './useQuery';

const useCrew = <T extends object>({
  path,
  onError,
}: {
  path: string;
  onError?: (error: Error) => void;
}) => {
  const data = useQuery<T>(path);

  const load = async () => {
    try {
      const res = await data;
      return await res?.read();
    } catch (error) {
      if (error instanceof Error && error.name === '') {
        if (onError) onError(error);
        return;
      }
      if (error instanceof Error) throw error;
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { data };
};

export default useCrew;
