import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, require: true },
    text: { type: String },
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);