import { useEffect, useState } from 'react';
import http from '../../api/http';
import ManagerInput from '../../components/ManagerInput';
import Crew from '../../components/Crew';
import { useMutationWithSuccessErrorBoundary } from '../../hooks/useMutation';

const DeleteCrewErrorBoundary = () => {
  const [managerCode, setManagerCode] = useState<string | null>(null);
  const [crews, setCrews] = useState<string[]>([]);

  const { mutate } = useMutationWithSuccessErrorBoundary<string[]>({
    onSuccess: (data) => setCrews(data),
  });

  const deleteCrew = async (crewName: string) => {
    mutate(() =>
      http.delete('/api/crew', {
        body: JSON.stringify({ managerCode, crewName }),
      })
    );
  };

  const requestCrews = async () => {
    const data = await http.get<string[]>('/api/crew');

    setCrews(data);
  };

  useEffect(() => {
    requestCrews();
  }, []);

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

export default DeleteCrewErrorBoundary;
