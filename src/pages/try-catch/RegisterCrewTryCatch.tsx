import { useState } from 'react';
import RegisterCrewForm from '../../components/RegisterCrewForm';
import { APIError, isAPIError } from '../../api/common';

const RegisterCrewTryCatch = () => {
  const [crew, setCrew] = useState<string | null>(null);

  const registerCrew = async () => {
    try {
      const response = await fetch('/api/crew', {
        method: 'POST',
        body: JSON.stringify({ crew }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('성공적으로 등록되었습니다.');
        return;
      }

      const data = await response.json();

      if (isAPIError(data)) {
        throw new APIError(data.code, data.message);
      }

      throw new Error();
    } catch (error) {
      if (error instanceof APIError) alert(error.message);
      return;
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
