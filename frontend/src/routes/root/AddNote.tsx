// import React from "react";

import { useContext, useState } from "react";
import NoteContext from "../../context/notes/noteConext";

// type Props = {};

const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const { actions } = useContext(NoteContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    actions.addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note);
  };

  return (
    <div>
      <h1 className="mt-8 mb-4 text-2xl font-poppins">Add Note</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="max-w-4xl grid gap-6 md:gap-8">
          <div className="grid md:grid-cols-2 w-full gap-6 md:gap-8">
            <input
              name="title"
              onChange={(e) => {
                onChange(e);
              }}
              className="outline-none rounded-3xl py-3 px-4 text-lg bg"
              type="text"
              placeholder="Note title"
              minLength={5}
              required
            />
            <input
              name="tag"
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
              name="description"
              onChange={(e) => {
                onChange(e);
              }}
              className="outline-none resize-none w-full rounded-3xl py-3 px-4 text-lg bg"
              placeholder="Note Description"
              minLength={5}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark duration-200 text-primary-content p-2 rounded px-4 my-2 md:my-4"
        >
          Add note +
        </button>
      </form>
    </div>
  );
};

export default AddNote;
