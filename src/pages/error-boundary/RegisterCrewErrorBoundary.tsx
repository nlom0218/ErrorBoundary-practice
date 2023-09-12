import { FormEventHandler, useState } from 'react';
import { useMutationWithSuccessErrorBoundary } from '../../hooks/useMutation';
import http from '../../api/http';

const RegisterCrewErrorBoundary = () => {
  const [crewName, setCrewName] = useState<string>('');

  const { mutate } = useMutationWithSuccessErrorBoundary<{ crewName: string }>({
    onSuccess: (data) => alert(`${data.crewName}크루가 등록되었습니다.`),
  });

  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    mutate(() =>
      http.post('/api/crew', {
        body: JSON.stringify({ crewName }),
      })
    );
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="register">크루 등록하기</label>
        <input
          value={crewName}
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
