import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import CustomErrorBoundary from '../../components/CustomErrorBoundary';

const ErrorBoundary = () => {
  return (
    <CustomErrorBoundary>
      <div>
        <h1>ErrorBoundary</h1>
        <Navigation />
        <Outlet />
      </div>
    </CustomErrorBoundary>
  );
};

export default ErrorBoundary;
