import './RegisterCrewForm.css';

const RegisterCrewForm = () => {
  return (
    <form>
      <label htmlFor="register">크루 등록하기</label>
      <input id="register" placeholder="노아" />
      <button type="submit">등록</button>
    </form>
  );
};

export default RegisterCrewForm;
