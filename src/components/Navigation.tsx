import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/">홈으로 이동하기</Link>
      <Link to="register-crew">크루 등록하기</Link>
      <Link to="show-crew">크루 보기</Link>
      <Link to="show-crew/?error=server">크루 보기(통신 에러 발생)</Link>
      <Link to="delete-crew">크루 삭제하기</Link>
    </div>
  );
};

export default Navigation;
