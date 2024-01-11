// import React from "react";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteContext from "../../context/notes/noteConext";

// type Props = {};

const url = import.meta.env.VITE_API_ENDPOINTF;

const Login = () => {
  const navigate = useNavigate();
  const { toastGenerator } = useContext(NoteContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (response.status == 500) {
      toastGenerator("Server unavailable, try again!", "server");
      return;
    }

    if (response.status == 200) {
      toastGenerator("Login successful!", "success");

      const resJson = await response.json();

      localStorage.setItem("mern-auth-token", resJson.authToken);

      console.log(resJson);
    } else {
      toastGenerator("Invalid details please try again!", "error");
    }

    // actions.addNote(credentials.email, credentials.password);
    // setCredentials({ title: "", description: "", tag: "" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(note);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("mern-auth-token");
    // console.log(authToken);

    if (authToken) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login into your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary-light px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New user?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-primary hover:text-primary-light"
            >
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
