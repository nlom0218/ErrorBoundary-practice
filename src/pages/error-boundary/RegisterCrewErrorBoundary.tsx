import { FormEventHandler, useEffect, useState } from 'react';
import http from '../../api/http';

import { APIError } from '../../api/common';

const RegisterCrewErrorBoundary = () => {
  const [crewName, setCrewName] = useState<string | null>(null);

  const [error, setError] = useState<APIError | Error | null>(null);

  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    registerCrew();
  };

  const registerCrew = async () => {
    try {
      await http.post('/api/crew', {
        body: JSON.stringify({ crewName }),
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
      <form onSubmit={submitForm}>
        <label htmlFor="register">크루 등록하기</label>
        <input
          value={crewName || ''}
          id="register"
          placeholder="노아"
          onChange={(e) => setCrewName(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default RegisterCrewErrorBoundary;
