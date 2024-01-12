import { ReactNode, useState } from "react";
import NoteContext from "./noteConext";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { redirect } from "react-router-dom";

const url = import.meta.env.VITE_API_ENDPOINTF;

const authToken = localStorage.getItem("mern-auth-token");

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

const toastGenerator = (
  message: string,
  toastType: "success" | "error" | "warning" | "info" | "server"
) => {
  const newToast: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (toastType) {
    case "success":
      toast.success(message, newToast);
      break;
    case "error":
      toast.error(message, newToast);
      break;
    case "warning":
      toast.warning(message, newToast);
      break;
    case "info":
      toast.info(message, newToast);
      break;
    case "server":
      toast.error(message, newToast);
      break;

    default:
      toast(message, newToast);
      break;
  }
};

const NoteState = (props: Props) => {
  const notesInitial: Notes = [];

  const [noteState, setNoteState] = useState(notesInitial);

  const getNotes = async () => {
    if (authToken && authToken.length > 1) {
      const toastId = toast.loading("Fetching notes...");

      const response = await fetch(`${url}/api/notes/getallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken!,
        },
      });

      const resJson = await response.json();

      if (response.status == 200) {
        setNoteState(resJson);
        toast.update(toastId, {
          render: "Notes loaded!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return resJson.length;
      } else {
        toast.update(toastId, {
          render: "Failed to load notes! Reload",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

      // toastGenerator("success", "success");

      return resJson.length;
    } else {
      toastGenerator("Please login to continue", "error");
    }
  };

  const addNote = async (title: string, description: string, tag?: string) => {
    if (authToken && authToken.length > 1) {
      const toastId = toast.loading("Adding note...");

      const response = await fetch(`${url}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken!,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status == 500) {
        toastGenerator("Internal server error occured!", "server");
      }

      const newNote = await response.json();

      if (response.status == 200) {
        if (newNote) {
          setNoteState(noteState.concat(newNote));
          // toastGenerator("Note added successfully!", "success");
          toast.update(toastId, {
            render: "Note added successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        toast.update(toastId, {
          render: "Failed to add note!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const editNote = async (
    id: string,
    title: string,
    description: string,
    tag: string
  ) => {
    if (authToken && authToken.length > 1) {
      const toastId = toast.loading("Fetching notes...");

      const newArr = noteState;

      for (let index = 0; index < noteState.length; index++) {
        const element = noteState[index];

        if (element._id === id) {
          newArr[index].title = title;
          newArr[index].tag = tag;
          newArr[index].description = description;

          const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken!,
            },
            body: JSON.stringify({ title, description, tag }),
          });

          if (response.status == 500) {
            toastGenerator("Internal server error occured!", "server");
          }

          if (response.status != 200) {
            toast.update(toastId, {
              render: "Falied to edit note!",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
            setTimeout(() => {
              getNotes();
            }, 3000);
          } else {
            setNoteState(newArr);
            toast.update(toastId, {
              render: "Edited note successfully!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          }
          break;
        }
      }
    }
  };

  const deleteNote = async (id: string) => {
    if (authToken && authToken.length > 1) {
      const toastId = toast.loading("Deleting note...");

      const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken!,
        },
      });

      if (response.status == 500) {
        toastGenerator("Internal server error occured!", "server");
      }

      const resJson = await response.json();

      if (resJson.success && resJson.deletedNote._id === id) {
        const newNotesnotes = noteState.filter((item) => {
          if (item._id !== id) {
            return item;
          }
        });
        setNoteState(newNotesnotes);
        // toastGenerator("Note was deleted successfully!", "success");
        toast.update(toastId, {
          render: "Note was deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        noteState,
        setNoteState,
        actions: { getNotes, addNote, editNote, deleteNote },
        toastGenerator,
      }}
    >
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss />
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
