import { FormEventHandler, useState } from 'react';

import { useRegisterCrew } from '../../hooks/useCrew';

const RegisterCrewTryCatch = () => {
  const [crewName, setCrewName] = useState<string>();

  const { error, registerCrew } = useRegisterCrew({
    onComplete: () => setCrewName(undefined),
  });

  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    registerCrew(crewName);
  };

  if (error) {
    alert(error.message);
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="register">크루 등록하기</label>
        <input
          value={crewName}
          id="register"
          placeholder="노아"
          onChange={(e) => setCrewName(e.target.value)}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default RegisterCrewTryCatch;
