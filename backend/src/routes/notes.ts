import express, { Request, Response } from "express";
import fetchUser from "../middleware/middleware";
import Notes from "../models/Notes";
import { body } from "express-validator";
import { create } from "domain";

const router = express.Router();

// ROUTE 1 :
// Get all notes : GET "/api/notes/getallnotes". Login required
router.get("/getallnotes", fetchUser, async (req: Request, res: Response) => {
  try {
    const notes = await Notes.find({ user: req.user?.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2 :
// Add new notes : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const { title, description, tag } = req.body;

      const createNote = await Notes.create({
        user: req.user?.id,
        title,
        description,
        tag,
      });

      res.json(createNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3 :
// Update note : PUT "/api/notes/updatenote/:id". Login required
router.put(
  "/updatenote/:id",
  fetchUser,
  async (req: Request, res: Response) => {
    try {
      const { title, description, tag } = req.body;

      // create new note object
      const newNote: any = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // find the note to be updated
      const note = await Notes.findById(req.params.id);
      // console.log(note);

      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user!.toString() !== req.user?.id) {
        return res.status(401).send("Not allowed");
      }

      const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        {
          $set: newNote,
        },
        { new: true }
      );

      res.json(updatedNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 4 :
// Delete note : DELETE "/api/notes/deletenote/:id". Login required
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req: Request, res: Response) => {
    try {
      // find the note to be updated
      const note = await Notes.findById(req.params.id);
      // console.log(note);

      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user!.toString() !== req.user?.id) {
        return res.status(401).send("Not allowed");
      }

      const deletedNote = await Notes.findByIdAndDelete(req.params.id);

      res.json({ success: "Note was deleted", deletedNote });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

export default router;
