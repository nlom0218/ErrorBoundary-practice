import { useEffect, useState } from 'react';
import Crew from '../../components/Crew';
import http from '../../api/http';

const ShowCrewTryCatch = () => {
  const [crews, setCrews] = useState<string[]>([]);

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
      <ul>
        {crews.map((crew) => (
          <Crew key={crew} crew={crew} />
        ))}
      </ul>
    </div>
  );
};

export default ShowCrewTryCatch;
