import { useState } from 'react';
import { APIError } from '../api/common';
import http from '../api/http';

type Props = {
  onComplete: () => void;
};

export const useRegisterCrew = ({ onComplete }: Props) => {
  const [error, setError] = useState<APIError | null>(null);

  const registerCrew = async (crewName?: string) => {
    try {
      await http.post('/api/crew', {
        body: JSON.stringify({ crewName }),
      });

      alert('성공적으로 등록되었습니다.');
    } catch (error) {
      if (error instanceof APIError) setError(error);
      else throw error;
    } finally {
      onComplete();
    }
  };

  return { error, registerCrew };
};
