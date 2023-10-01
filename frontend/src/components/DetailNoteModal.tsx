import utilStyles from "../styles/util.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { NoteModel } from "../models/note";
import { useState } from "react";
import * as NoteApi from "../network/noteApi";

interface DetailNoteModalProps {
  note: NoteModel;
  onHide: () => void;
  onDelete: (note: NoteModel) => void;
  onUpdate: (note: NoteModel) => void;
}

const DetailNoteModal = ({
  note,
  onHide,
  onDelete,
  onUpdate,
}: DetailNoteModalProps) => {
  const { _id, title, text } = note;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedText, setupdatedText] = useState(text);
  const [updatedNote, setUpdatedNote] = useState<NoteApi.NoteInput>({
    title: updatedTitle,
    text: updatedText,
  });
  const [loading, setLoading] = useState(false);

  async function onDeleteNote(note: NoteModel) {
    try {
      setLoading(true);
      await NoteApi.deleteNote(_id);
      onDelete(note);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function onUpdateNote(note: NoteApi.NoteInput) {
    try {
      setLoading(true);
      const response = await NoteApi.updateNote(updatedNote, _id);
      onUpdate(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show centered onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="detailNoteForm"
          onSubmit={(e) => {
            e.preventDefault();
            onUpdateNote(updatedNote);
          }}
        >
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                setUpdatedTitle(e.target.value);
              }}
              value={updatedTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              onChange={(e) => {
                setupdatedText(e.target.value);
              }}
              value={updatedText}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          className={utilStyles.Center}
          disabled={loading}
          onClick={() => {
            onDeleteNote(note);
          }}
        >
          {loading ? "Loading..." : "Delete"}
        </Button>
        <Button
          type="submit"
          form="detailNoteForm"
          className={utilStyles.Center}
          disabled={loading}
          onClick={() => {
            setUpdatedNote({ title: updatedTitle, text: updatedText });
          }}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailNoteModal;
