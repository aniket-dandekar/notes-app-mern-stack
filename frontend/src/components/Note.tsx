// import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteConext";

type Props = {
  note: {
    _id: string;
    user: string;
    title: string;
    description: string;
    tag: string;
    date: string;
    __v: number;
  };
};

const Note = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, title, description, tag } = props.note;
  const [eNote, setENote] = useState({
    etitle: title,
    edescription: description,
    etag: tag,
  });

  const { actions } = useContext(NoteContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    actions.editNote(_id, eNote.etitle, eNote.edescription, eNote.etag);
    setShowModal(false);
    // actions.addNote(eNote.etitle, eNote.edescription, eNote.etag);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setENote({ ...eNote, [e.target.name]: e.target.value });
    // console.log(eNote);
  };

  return (
    <div className="relative p-6 rounded-3xl bg-foreground shadow-xl border border-border">
      <h2 className="text-copy text-lg font-bold">{title}</h2>

      <p className="text-copy-light">{description}</p>

      <span className="absolute top-0 right-0 px-6 py-0.5 rounded-tr-3xl rounded-bl-3xl bg-secondary text-secondary-content">
        {tag}
      </span>

      <button
        className="bg-error text-error-content text-sm p-2 my-2 rounded"
        onClick={() => {
          actions.deleteNote(_id);
        }}
      >
        <FaTrashAlt />
      </button>
      <button
        className="bg-error text-error-content text-sm p-2 my-2 rounded"
        onClick={() => setShowModal(true)}
      >
        edit
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-sm md:max-w-3xl">
              {/*content*/}
              <div className="rounded-3xl p-8 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="w-full mb-4 flex justify-between items-start">
                  <h3 className="text-3xl">Edit Note</h3>
                  <button
                    className="underline text-lg"
                    onClick={() => setShowModal(false)}
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
                        className="outline-none rounded-3xl py-3 px-4 text-lg bg"
                        type="text"
                        placeholder="Note titile"
                      />
                      <input
                        name="etag"
                        value={eNote.etag}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        className="outline-none rounded-3xl py-3 px-4 text-lg bg"
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
                        className="outline-none resize-none w-full rounded-3xl py-3 px-4 text-lg bg"
                        placeholder="Note Description"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-primary-content"
                    onClick={handleSubmit}
                  >
                    Edit note
                  </button>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b">
                  footer
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Note;
