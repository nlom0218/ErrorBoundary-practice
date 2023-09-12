import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import CustomErrorBoundary from '../../components/CustomErrorBoundary';
import LocalErrorBoundary from '../../components/LocalErrorBoundary';

const ErrorBoundary = () => {
  return (
    <CustomErrorBoundary>
      <div>
        <h1>ErrorBoundary</h1>
        <Navigation />
        <LocalErrorBoundary>
          <Outlet />
        </LocalErrorBoundary>
      </div>
    </CustomErrorBoundary>
  );
};

export default ErrorBoundary;
