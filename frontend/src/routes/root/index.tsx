// import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/notes/noteConext";
import Note from "../../components/Note";
import AddNote from "./AddNote";
// import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

// import Navbar from "../../components/Navbar";

// type Props = {}
export type NoteType = {
  _id: string;
  user: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  __v: number;
};

const Root = () => {
  const navigate = useNavigate();
  const { noteState, actions } = useContext(NoteContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [loadingNotes, setLoadingNotes] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [eNote, setENote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setENote({ ...eNote, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    actions.editNote(eNote._id, eNote.etitle, eNote.edescription, eNote.etag);
    setShowModal(false);
  };

  const handleEdit = async (note: NoteType) => {
    setShowModal(true);
    setENote({
      ...eNote,
      _id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("mern-auth-token");
    if (!authToken) {
      navigate("/login");
    }
    actions.getNotes();
  }, []);

  return (
    <>
      <div className="mx-6 sm:mx-8 lg:mx-auto lg:max-w-4xl xl:max-w-6xl">
        <AddNote />
        <div className="pb-20">
          <h2 className="my-8 text-2xl font-poppins">Your Notes</h2>

          {noteState.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-12">
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative my-6 mx-auto max-w-sm md:max-w-3xl">
                      {/*content*/}
                      <div className="rounded-3xl p-8 shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
                        {/*header*/}
                        <div className="w-full mb-4 flex justify-between items-start">
                          <h3 className="text-3xl">Edit Note</h3>
                          <button
                            className="underline text-lg"
                            onClick={() => {
                              setShowModal(false);
                            }}
                          >
                            close
                          </button>
                        </div>
                        {/*body*/}
                        <form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <div className="max-w-4xl grid gap-8">
                            <div className="grid md:grid-cols-2 w-full gap-8">
                              <input
                                name="etitle"
                                value={eNote.etitle}
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                className="outline-none rounded-3xl py-3 px-4 text-lg bg-white"
                                type="text"
                                placeholder="Note title"
                                minLength={5}
                                required
                              />

                              <input
                                name="etag"
                                value={eNote.etag}
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                className="outline-none rounded-3xl py-3 px-4 text-lg bg-white"
                                type="text"
                                placeholder="Tag"
                              />
                            </div>

                            <div>
                              <textarea
                                name="edescription"
                                value={eNote.edescription}
                                onChange={(e) => {
                                  onChange(e);
                                }}
                                className="outline-none resize-none w-full rounded-3xl py-3 px-4 text-lg bg-white"
                                placeholder="Note Description"
                                minLength={5}
                                required
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="bg-primary text-primary-content p-2 rounded px-4 my-2 md:my-4"
                          >
                            Edit note
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              {noteState.map((note) => (
                <Note key={note._id} note={note} handleEdit={handleEdit} />
              ))}
            </div>
          ) : (
            <div className="px-6">
              <h3 className="text-xl font-poppins">Nothing to show here!</h3>
              <p>Add notes to show here</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Root;
