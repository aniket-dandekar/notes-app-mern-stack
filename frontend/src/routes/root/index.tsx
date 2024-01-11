// import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/notes/noteConext";
import Note from "../../components/Note";
import AddNote from "./AddNote";
import { LuLoader2 } from "react-icons/lu";

// import Navbar from "../../components/Navbar";

// type Props = {}

const Root = () => {
  const { noteState, actions } = useContext(NoteContext);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const handleLoading = async () => {
    setLoadingNotes(true);
    const data = await actions.getNotes();
    console.log(data);
    setLoadingNotes(false);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  return (
    <>
      <div className="mx-8 lg:mx-auto lg:max-w-4xl xl:max-w-6xl">
        <AddNote />
        <div>
          <h2 className="my-8 text-2xl px-6 font-poppins">Your Notes</h2>

          {noteState.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-12">
              {noteState.map((note) => (
                <Note key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <>
              {loadingNotes ? (
                <div className="px-6 flex items-center gap-2">
                  <LuLoader2 className="animate-spin text-xl" />
                  <h3 className="font-poppins text-xl">Fetching notes</h3>
                </div>
              ) : (
                <div className="px-6">
                  <h3 className="text-xl font-poppins">
                    Nothing to show here!
                  </h3>
                  <p>Add notes to show here</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Root;
