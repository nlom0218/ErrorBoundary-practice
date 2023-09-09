import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation';

const ErrorBoundary = () => {
  return (
    <div>
      <h1>ErrorBoundary</h1>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default ErrorBoundary;
