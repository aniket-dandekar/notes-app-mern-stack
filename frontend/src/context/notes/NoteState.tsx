import { ReactNode, useState } from "react";
import NoteContext from "./noteConext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = import.meta.env.VITE_API_ENDPOINTF;

type Props = {
  children: ReactNode;
};

type Notes = {
  _id: string;
  user: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  __v: number;
}[];

const toaster = (length: number) => {
  if (length === 0) {
    toast.error("No notes found!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const NoteState = (props: Props) => {
  const notesInitial: Notes = [];

  const [noteState, setNoteState] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDg0OTI2MjZlZTkzMDIzYzQ0Nzk3In0sImlhdCI6MTcwNDgyMTkwNn0.nPfIw-WHlj7TPAwirjD9xZqW2X3g6hUUlBkE363_TWs",
      },
    });

    const resJson = await response.json();
    setNoteState(resJson);

    toaster(resJson.length);
    return resJson.length;
  };

  const addNote = async (title: string, description: string, tag?: string) => {
    // console.log("ADding a note", { title, description, tag });
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDg0OTI2MjZlZTkzMDIzYzQ0Nzk3In0sImlhdCI6MTcwNDgyMTkwNn0.nPfIw-WHlj7TPAwirjD9xZqW2X3g6hUUlBkE363_TWs",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNote = await response.json();
    // console.log(newNote);
    setNoteState(noteState.concat(newNote));
  };

  const editNote = async (
    id: string,
    title: string,
    description: string,
    tag: string
  ) => {
    // console.log("Editing a note", { title, description, tag });
    const newArr = noteState;

    for (let index = 0; index < noteState.length; index++) {
      const element = noteState[index];
      if (element._id === id) {
        newArr[index].title = title;
        newArr[index].tag = tag;
        newArr[index].description = description;
        setNoteState(newArr);
        // console.log(id);
        const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDg0OTI2MjZlZTkzMDIzYzQ0Nzk3In0sImlhdCI6MTcwNDgyMTkwNn0.nPfIw-WHlj7TPAwirjD9xZqW2X3g6hUUlBkE363_TWs",
          },
          body: JSON.stringify({ title, description, tag }),
        });
        const resJson = await response.json();
        console.log(resJson);
      }
    }
    // setNoteState(noteState.concat(newNote));
  };

  const deleteNote = async (id: string) => {
    // console.log(id);
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5ZDg0OTI2MjZlZTkzMDIzYzQ0Nzk3In0sImlhdCI6MTcwNDgyMTkwNn0.nPfIw-WHlj7TPAwirjD9xZqW2X3g6hUUlBkE363_TWs",
      },
    });

    const resJson = await response.json();
    // console.log(resJson);
    if (resJson.success && resJson.deletedNote._id === id) {
      const newNotesnotes = noteState.filter((item) => {
        if (item._id !== id) {
          return item;
        }
      });
      // console.log(newNotesnotes);
      setNoteState(newNotesnotes);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteState,
        setNoteState,
        actions: { getNotes, addNote, editNote, deleteNote },
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
