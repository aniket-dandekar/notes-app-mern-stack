import { createContext } from "react";

export type NoteContent = {
  noteState: {
    name: string;
    surname: string;
    class: string;
  };
  setNoteState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      class: string;
    }>
  >;
};
const NoteContext = createContext<NoteContent>({
  noteState: { name: "aniket", surname: "dandekar", class: "badi" },
  setNoteState: () => {},
});

export default NoteContext;
