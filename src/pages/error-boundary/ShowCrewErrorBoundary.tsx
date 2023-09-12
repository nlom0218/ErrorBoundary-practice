/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../../api/http';
import Crew from '../../components/Crew';
import { APIError } from '../../api/common';

const ShowCrewErrorBoundary = () => {
  const { search } = useLocation();

  const [crews, setCrews] = useState<string[]>([]);

  const requestCrews = async () => {
    try {
      const data = await http.get<string[]>(`/api/crew/${search}`);

      setCrews(data);
    } catch (error) {
      if (error instanceof APIError) throw error;
      if (error instanceof Error) throw error;
    }
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

export default ShowCrewErrorBoundary;
