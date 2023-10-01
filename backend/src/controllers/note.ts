import { RequestHandler } from "express";
import NoteModel from "../models/note";
import mongoose from "mongoose";
import createHttpError from "http-errors";

// Get array of notes
export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

// Get single note
export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

// InputNote for type checking
interface CreateNoteBody {
    title?: string,
    text?: string,
}

// Create note
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title")
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text,
        });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

// note id from param
interface UpdatenoteParams {
    noteId: string,
}

// UpdatedNote for type checking
interface UpdateNoteBody {
    title?: string,
    text?: string,
}

// Update note
export const updateNote: RequestHandler<UpdatenoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }
        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        note.title = newTitle;
        note.text = newText;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}

// Delete note
export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "invalid note id");
        }
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "note not found")
        }
        await note.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}