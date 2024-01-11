import React from "react";
import ReactDOM from "react-dom/client";
// import dotenv from "dotenv";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./context/notes/NoteState.tsx";
import AppWrap, { AppWrapFunction } from "./routes/AppWrap.tsx";
import "@fontsource-variable/inter";
import Root from "./routes/root";
import Contact from "./routes/contact";
import About from "./routes/about/";
import Login from "./routes/login/";
import Signup from "./routes/signup/";
import Logout from "./routes/logout/index.tsx";

// dotenv.config()

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
    path: "about",
    element: wrapper(AppWrap, About),
  },
  {
    path: "contact",
    element: wrapper(AppWrap, Contact),
  },
  {
    path: "login",
    element: wrapper(AppWrap, Login),
  },
  {
    path: "signup",
    element: wrapper(AppWrap, Signup),
  },
  {
    path: "logout",
    element: wrapper(AppWrap, Logout),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NoteState>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </NoteState>
);
