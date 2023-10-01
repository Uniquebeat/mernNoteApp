import express from "express";
import * as NoteController from "../controllers/note";

const router = express.Router();

router.get("/", NoteController.getNotes); // GET notes

router.get("/:noteId", NoteController.getNote); // GET note

router.post("/", NoteController.createNote); // POST new note

router.patch("/:noteId", NoteController.updateNote); // PATH note

router.delete("/:noteId", NoteController.deleteNote); // DELETE note

export default router;