import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    // const authToken = localStorage.getItem("mern-auth-token");
    // if (authToken) {
    localStorage.removeItem("mern-auth-token");
    window.location.href = "/";

    // navigate("/");
    // }
    // navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
