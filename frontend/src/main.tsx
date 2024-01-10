import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/contact";
import NoteState from "./context/notes/NoteState.tsx";
import AppWrap, { AppWrapFunction } from "./routes/AppWrap.tsx";

function wrapper(AppWrap: AppWrapFunction, Component: () => JSX.Element) {
  const WrappedComponent = AppWrap(Component);
  return <WrappedComponent />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: wrapper(AppWrap, Root),
  },
  {
    path: "contact",
    element: wrapper(AppWrap, Contact),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NoteState>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </NoteState>
);
