// import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import NoteContext from "../context/notes/noteConext";
import { NoteType } from "../routes/root";

type Props = {
  note: NoteType;
  handleEdit: (note: NoteType) => void;
};

const Note = ({ handleEdit, note }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, title, description, tag } = note;

  const { actions } = useContext(NoteContext);

  return (
    <div className="relative flex flex-col p-6 rounded-3xl overflow-hidden bg-foreground shadow-xl border border-border">
      <div
        className="mb-auto"
        style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
      >
        <h2 className="text-copy text-lg font-bold">{title}</h2>

        <p className="text-copy-light">{description}</p>
      </div>

      <div className="flex w-full gap-2">
        <button
          className="bg-blue-500 text-error-content text-sm p-2 mt-4 rounded"
          onClick={() => {
            handleEdit(note);
          }}
        >
          <FiEdit />
        </button>
        <button
          className="bg-error text-error-content text-sm p-2 mt-4 rounded"
          onClick={() => {
            actions.deleteNote(_id);
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
      <span className="absolute top-0 right-0 px-6 py-0.5 rounded-tr-3xl rounded-bl-3xl bg-secondary text-secondary-content">
        {tag}
      </span>
    </div>
  );
};

export default Note;
