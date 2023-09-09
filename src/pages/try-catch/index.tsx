import { Outlet } from 'react-router-dom';

import Navigation from '../../components/Navigation';

const TryCatch = () => {
  return (
    <div>
      <h1>Try-Catch</h1>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default TryCatch;
