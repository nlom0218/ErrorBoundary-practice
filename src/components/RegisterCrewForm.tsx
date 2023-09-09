import React, { FormEventHandler } from 'react';
import './RegisterCrewForm.css';

type Props = {
  crew: string | null;
  setCrew: React.Dispatch<React.SetStateAction<string | null>>;
  registerCrew: () => void;
};

const RegisterCrewForm = ({ crew, setCrew, registerCrew }: Props) => {
  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    registerCrew();
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="register">크루 등록하기</label>
      <input
        value={crew || ''}
        id="register"
        placeholder="노아"
        onChange={(e) => setCrew(e.currentTarget.value)}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default RegisterCrewForm;
