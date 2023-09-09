import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <h1>React Error Handling</h1>
      <Link to={'try-catch'}>try-catch</Link>
      <Link to={'error-boundary'}>error-boundary</Link>
    </div>
  );
};

export default Landing;
