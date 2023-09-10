import { useEffect, useState } from 'react';
import http from '../../api/http';
import RegisterCrewForm from '../../components/RegisterCrewForm';
import { APIError } from '../../api/common';

const RegisterCrewErrorBoundary = () => {
  const [crew, setCrew] = useState<string | null>(null);
  const [error, setError] = useState<APIError | Error | null>(null);

  const registerCrew = async () => {
    try {
      await http.post('/api/crew', {
        body: JSON.stringify({ crew }),
      });

      alert('성공적으로 등록되었습니다.');
    } catch (error) {
      if (error instanceof APIError) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <div>
      <RegisterCrewForm
        crew={crew}
        setCrew={setCrew}
        registerCrew={registerCrew}
      />
    </div>
  );
};

export default RegisterCrewErrorBoundary;
