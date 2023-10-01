import { useState } from "react";
import utilStyles from "../styles/util.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import * as NoteApi from "../network/noteApi";
import { NoteModel } from "../models/note";

interface AddNewNoteModalProps {
  onHide: () => void;
  onSubmit: (newNote: NoteModel) => void;
}

const AddNewNoteModal = ({ onHide, onSubmit }: AddNewNoteModalProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [note, setNote] = useState<NoteApi.NoteInput>({
    title: title,
    text: text,
  });
  const [loading, setLoading] = useState(false);

  async function OnNoteSave(noteInput: NoteApi.NoteInput) {
    try {
      setLoading(true);
      const response = await NoteApi.createNote(noteInput);
      onSubmit(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show centered onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="addNoteForm"
          onSubmit={(e) => {
            e.preventDefault();
            OnNoteSave(note);
          }}
        >
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addNoteForm"
          variant="success"
          onClick={() => {
            setNote({ title: title, text: text });
          }}
          className={utilStyles.Center}
          disabled={loading}
        >
          {loading ? "Loading..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewNoteModal;
