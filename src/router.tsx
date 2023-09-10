import { createBrowserRouter } from 'react-router-dom';

import App from './App';

import Landing from './pages/Landing';
import TryCatch from './pages/try-catch';
import ErrorBoundary from './pages/error-boundary';
import RegisterCrewTryCatch from './pages/try-catch/RegisterCrewTryCatch';
import ShowCrewTryCatch from './pages/try-catch/ShowCrewTryCatch';
import DeleteCrewTryCatch from './pages/try-catch/DeleteCrewTryCatch';
import ShowCrewErrorBoundary from './pages/error-boundary/ShowCrewErrorBoundary';
import RegisterCrewErrorBoundary from './pages/error-boundary/RegisterCrewErrorBoundary';
import DeleteCrewErrorBoundary from './pages/error-boundary/DeleteCrewErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'try-catch',
        element: <TryCatch />,
        children: [
          {
            path: 'register-crew',
            element: <RegisterCrewTryCatch />,
          },
          {
            path: 'show-crew',
            element: <ShowCrewTryCatch />,
          },
          {
            path: 'show-crew?error=server',
            element: <ShowCrewTryCatch />,
          },
          {
            path: 'delete-crew',
            element: <DeleteCrewTryCatch />,
          },
        ],
      },
      {
        path: 'error-boundary',
        element: <ErrorBoundary />,
        children: [
          {
            path: 'register-crew',
            element: <RegisterCrewErrorBoundary />,
          },
          {
            path: 'show-crew',
            element: <ShowCrewErrorBoundary />,
          },
          {
            path: 'delete-crew',
            element: <DeleteCrewErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

export default router;
