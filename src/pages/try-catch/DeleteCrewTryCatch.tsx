import { useEffect, useState } from 'react';
import ManagerInput from '../../components/ManagerInput';
import Crew from '../../components/Crew';
import http from '../../api/http';
import { useMutation } from '../../hooks/useMutation';

type ResponseDeleteCrew = string[];

const DeleteCrewTryCatch = () => {
  const [managerCode, setManagerCode] = useState<string | null>(null);
  const [crews, setCrews] = useState<string[]>([]);

  const { mutate, error, clearError } = useMutation<ResponseDeleteCrew>({
    onSuccess: (data) => setCrews(data),
  });

  const deleteCrew = (crewName: string) => {
    mutate(() =>
      http.delete('/api/crew', {
        body: JSON.stringify({ managerCode, crewName }),
      })
    );
  };

  useEffect(() => {
    requestCrews();
  }, []);

  if (error) {
    return (
      <div>
        <h2>에러가 발생했습니다.</h2>
        <p>{error.message}</p>
        <button onClick={clearError}>재시도하기</button>
      </div>
    );
  }

  const requestCrews = async () => {
    const data = await http.get<string[]>('/api/crew');

    setCrews(data);
  };

  if (crews.length === 0) return <div>등록된 크루가 없습니다.</div>;

  return (
    <div>
      <ManagerInput managerCode={managerCode} setManagerCode={setManagerCode} />
      <ul>
        {crews.map((crew) => (
          <Crew key={crew} crew={crew} deleteCrew={deleteCrew} />
        ))}
      </ul>
    </div>
  );
};

export default DeleteCrewTryCatch;

// type ResponseDeleteCrew = string[];

// const DeleteCrew = () => {
//   const [crews, setCrews] = useState<string[]>([]);

//   const { mutate, error, clearError } = useMutation<ResponseDeleteCrew>({
//     onSuccess: (data) => setCrews(data),
//   });

//   const deleteCrew = () => {
//     mutate(() => http.delete('/api/crew'));
//   };

//   if (error) {
//     return (
//       <div>
//         <h2>에러가 발생했습니다.</h2>
//         <p>{error.message}</p>
//         <button onClick={clearError}>재시도하기</button>
//       </div>
//     );
//   }
//   // ...
// };
