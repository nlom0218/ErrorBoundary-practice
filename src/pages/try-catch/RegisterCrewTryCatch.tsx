import { useState } from 'react';
import RegisterCrewForm from '../../components/RegisterCrewForm';
import { APIError } from '../../api/common';
import http from '../../api/http';

const RegisterCrewTryCatch = () => {
  const [crew, setCrew] = useState<string | null>(null);

  const registerCrew = async () => {
    try {
      await http.post('/api/crew', {
        body: JSON.stringify({ crew }),
      });

      alert('성공적으로 등록되었습니다.');
    } catch (error) {
      if (error instanceof APIError) alert(error.message);
      else throw error;
    } finally {
      setCrew(null);
    }
  };

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

export default RegisterCrewTryCatch;
