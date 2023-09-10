import ReactDOM from 'react-dom/client';

import './index.css';
import { worker } from './mocks/worker.ts';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
