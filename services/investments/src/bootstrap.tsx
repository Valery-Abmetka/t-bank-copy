import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Suspense } from 'react';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>investment</div>,
    children: [
      {
        path: '/about',
        element: (
          <Suspense
            fallback={
              <div
                className=''
                onClick={() => {}}
              >
                cjcj
              </div>
            }
          >
            <div>investment about</div>
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: <div>shop</div>,
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
