// import { Form, Link } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <Link className="underline" to={`/`}>
        Home
      </Link>
    </div>
  );
}
