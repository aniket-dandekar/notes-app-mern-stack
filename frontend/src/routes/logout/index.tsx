import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("mern-auth-token");
    window.location.href = "/login";
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
