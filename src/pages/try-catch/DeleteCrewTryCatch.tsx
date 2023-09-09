import { useEffect, useState } from 'react';
import ManagerInput from '../../components/ManagerInput';
import Crew from '../../components/Crew';
import http from '../../api/http';
import { APIError } from '../../api/common';

const DeleteCrewTryCatch = () => {
  const [managerCode, setManagerCode] = useState<string | null>(null);
  const [crews, setCrews] = useState<string[]>([]);

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
      if (error instanceof APIError) alert(error.message);
      else throw error;
    }
  };

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
