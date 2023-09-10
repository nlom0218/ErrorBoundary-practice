/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Crew from '../../components/Crew';
import http from '../../api/http';
import { useLocation, useNavigate } from 'react-router-dom';
import { APIError } from '../../api/common';

const ShowCrewTryCatch = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [crews, setCrews] = useState<string[]>([]);

  const requestCrews = async () => {
    try {
      const data = await http.get<string[]>(`/api/crew/${search}`);

      setCrews(data);
    } catch (error) {
      if (error instanceof APIError) {
        alert(error.message);
        navigate('/');
      } else throw error;
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

export default ShowCrewTryCatch;
