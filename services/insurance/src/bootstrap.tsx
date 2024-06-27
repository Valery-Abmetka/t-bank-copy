import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>insurance</div>,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>cjcj</div>}>
            <div>insurance about</div>
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
