import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout';

export const appRouter = createBrowserRouter([
  {
    path: '/investments',
    element: <MainLayout />,
  },
]);
