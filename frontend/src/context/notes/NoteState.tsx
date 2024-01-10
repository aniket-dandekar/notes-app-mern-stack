import { ReactNode, useState } from "react";
import NoteContext from "./noteConext";

type Props = {
  children: ReactNode;
};

const NoteState = (props: Props) => {
  const [noteState, setNoteState] = useState({
    name: "Aniket",
    surname: "dandekar",
    class: "badi",
  });

  return (
    <NoteContext.Provider value={{ noteState, setNoteState }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
