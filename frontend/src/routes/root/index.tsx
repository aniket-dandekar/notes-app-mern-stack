// import { Link } from "react-router-dom";

import { useContext } from "react";
import NoteContext from "../../context/notes/noteConext";
import Note from "../../components/Note";
import AddNote from "./AddNote";

// import Navbar from "../../components/Navbar";

// type Props = {}

const Root = () => {
  const { noteState } = useContext(NoteContext);

  // const [data, setData] = useState<Data>();
  // const getData = async () => {
  //   const res = await fetch("https://mern-notesapp-backend.vercel.app/");
  //   const resJson = await res.json();
  //   setData(resJson);
  //   // return resJson;
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <div className="mx-8 lg:mx-auto lg:max-w-4xl xl:max-w-6xl">
        <AddNote />
        <div>
          <h2 className="my-8 text-2xl px-6 font-poppins">Your Notes</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {noteState.length > 0 &&
              noteState.map((note) => <Note key={note._id} note={note} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
