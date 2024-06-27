import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { App } from "./components/App/App";
const About = lazy(() => import("@/pages/about/About"));

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>cjcj</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: <div>shop</div>,
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
