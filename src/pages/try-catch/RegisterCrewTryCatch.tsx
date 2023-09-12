import { FormEventHandler, useState } from 'react';
import http from '../../api/http';
import { useMutation } from '../../hooks/useMutation';
// import { APIError } from '../../api/common';

type ResponseRegisterCrew = { crewName: string };

const RegisterCrewTryCatch = () => {
  const [crewName, setCrewName] = useState<string>('');

  const { mutate, error, clearError } = useMutation<ResponseRegisterCrew>({
    onSuccess: (data) => alert(`${data.crewName}크루가 등록되었습니다.`),
  });

  const handleSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();
    mutate(() =>
      http.request('/api/crew', {
        method: 'POST',
        body: JSON.stringify({ crewName }),
      })
    );
  };

  if (error) {
    return (
      <div>
        <h2>에러가 발생했습니다.</h2>
        <p>{error.message}</p>
        <button onClick={clearError}>재시도하기</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
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

export default RegisterCrewTryCatch;

// type ResponseRegisterCrew = { crewName: string };

// const RegisterCrew = () => {
//   const [crewName, setCrewName] = useState<string>('');
//   const [error, setError] = useState<APIError | null>(null);

//   const registerCrew = async () => {
//     try {
//       const data: ResponseRegisterCrew = await http.post('/api/crew');

//       alert(`${data.crewName}크루가 등록되었습니다.`);
//     } catch (error) {
//       if (error instanceof APIError) setError(error);
//       if (error instanceof Error) throw error;
//     }
//   };

//   if (error) {
//     return (
//       <div>
//         <h2>에러가 발생했습니다.</h2>
//         <p>{error.message}</p>
//         <button onClick={() => setError(null)}>재시도하기</button>
//       </div>
//     );
//   }

//   // ...
// };
