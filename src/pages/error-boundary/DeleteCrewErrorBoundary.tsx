import { useEffect, useState } from 'react';
import http from '../../api/http';
import ManagerInput from '../../components/ManagerInput';
import Crew from '../../components/Crew';
import { APIError } from '../../api/common';

const DeleteCrewErrorBoundary = () => {
  const [managerCode, setManagerCode] = useState<string | null>(null);
  const [crews, setCrews] = useState<string[]>([]);
  const [error, setError] = useState<APIError | Error | null>(null);

  const requestCrews = async () => {
    const data = await http.get<string[]>('/api/crew');

    setCrews(data);
  };

  useEffect(() => {
    requestCrews();
  }, []);

  const deleteCrew = async (crewName: string) => {
    try {
      const data = await http.delete('/api/crew', {
        body: JSON.stringify({ managerCode, crewName }),
      });

      setCrews(data);
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
