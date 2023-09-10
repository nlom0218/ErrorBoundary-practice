import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <div>
      <div>500 Server Error</div>
      <Link to="/">홈으로 이동하기</Link>
    </div>
  );
};

export default ServerError;
