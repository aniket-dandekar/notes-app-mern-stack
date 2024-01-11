import { createContext } from "react";

export type NoteContent = {
  noteState: {
    _id: string;
    user: string;
    title: string;
    description: string;
    tag: string;
    date: string;
    __v: number;
  }[];
  setNoteState: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        user: string;
        title: string;
        description: string;
        tag: string;
        date: string;
        __v: number;
      }[]
    >
  >;
  actions: {
    getNotes: () => Promise<number>;
    deleteNote: (id: string) => void;
    addNote: (title: string, description: string, tag?: string) => void;
    editNote: (
      id: string,
      title: string,
      description: string,
      tag: string
    ) => void;
  };
  toastGenerator: (
    message: string,
    toastType: "success" | "error" | "warning" | "info" | "server"
  ) => void;
};

const NoteContext = createContext<NoteContent>({
  noteState: [],
  setNoteState: () => {},
  actions: {
    getNotes: async () => {
      const numberOfNotes = 0;
      return numberOfNotes;
    },
    deleteNote: () => {},
    addNote: () => {},
    editNote: () => {},
  },
  toastGenerator: () => {},
});

export default NoteContext;
