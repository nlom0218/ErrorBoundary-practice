import './ManagerInput.css';

type Props = {
  managerCode: string | null;
  setManagerCode: React.Dispatch<React.SetStateAction<string | null>>;
};

const ManagerInput = ({ managerCode, setManagerCode }: Props) => {
  return (
    <div className="manager-input">
      <label htmlFor="manager-code">관리자 코드를 입력하세요.</label>
      <input
        id="manager-code"
        placeholder="ABC123"
        value={managerCode || ''}
        onChange={(e) => setManagerCode(e.target.value)}
      />
    </div>
  );
};

export default ManagerInput;
