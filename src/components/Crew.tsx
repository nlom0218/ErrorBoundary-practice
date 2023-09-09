import './Crew.css';

type Props = {
  crew: string;
  deleteCrew?: (crew: string) => void;
};

const Crew = ({ crew, deleteCrew }: Props) => {
  return (
    <li key={crew} className="crew-item">
      <span>{crew}</span>
      {deleteCrew && (
        <button
          className="delete-button"
          onClick={() => {
            deleteCrew(crew);
          }}
        >
          삭제
        </button>
      )}
    </li>
  );
};

export default Crew;
