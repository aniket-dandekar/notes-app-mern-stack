import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/noteConext";
import { NoteType } from ".";

type Props = {
  note: NoteType;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditModal = ({ note, showModal, setShowModal }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, title, description, tag } = note;
  const [eNote, setENote] = useState({
    etitle: title,
    edescription: description,
    etag: tag,
  });

//   const { actions } = useContext(NoteContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     actions.editNote(_id, eNote.etitle, eNote.edescription, eNote.etag);
  //     setShowModal(false);
  //   };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setENote({ ...eNote, [e.target.name]: e.target.value });
  };
  return (
    <>
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
                        placeholder="Note titile"
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
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-primary-content p-2 rounded px-4 my-2 md:my-4"
                    onClick={handleSubmit}
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
    </>
  );
};

export default EditModal;
