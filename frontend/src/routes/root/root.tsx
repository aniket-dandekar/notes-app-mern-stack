// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Data = {
  name: string;
  surname: string;
  class: string;
};

export default function Root() {
  const [data, setData] = useState<Data>();
  const getData = async () => {
    const res = await fetch("https://mern-notesapp-backend.vercel.app/");
    const resJson = await res.json();
    setData(resJson);
    // return resJson;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h1>Home</h1>
        <Link className="underline" to={`/contact`}>
          Contact
        </Link>

        <div className="">
          <h2 className="my-2 text-xl">Name : {data?.name}</h2>
          <h3 className="my-2 text-lg">Last Name : {data?.surname}</h3>
          <h4 className="my-2">Class : {data?.class}</h4>
        </div>
      </div>
    </>
  );
}
