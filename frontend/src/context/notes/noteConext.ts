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
    deleteNote: (id: string) => void;
    addNote: (title: string, description: string, tag?: string) => void;
    editNote: (
      id: string,
      title: string,
      description: string,
      tag: string
    ) => void;
  };
};
const NoteContext = createContext<NoteContent>({
  noteState: [],
  setNoteState: () => {},
  actions: { deleteNote: () => {}, addNote: () => {}, editNote: () => {} },
});

export default NoteContext;
