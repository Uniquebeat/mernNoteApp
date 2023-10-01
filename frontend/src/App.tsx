import { Button, Col, Container, Row } from "react-bootstrap";
import { NoteModel } from "./models/note";
import { useEffect, useState } from "react";
import styles from "./styles/notePage.module.css";
import utilStyles from "./styles/util.module.css";
import * as NoteApi from "./network/noteApi";
import NoteCard from "./components/NoteCard";
import AddNewNoteModal from "./components/AddNewNoteModal";
import DetailNoteModal from "./components/DetailNoteModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNewNoteModal, setShowAddNewNoteModal] = useState(false);
  const [noteToDetail, setNoteToDetail] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container className="pt-4 pb-4">
      <Button
        className={`mb-4 ${utilStyles.Center}`}
        onClick={() => setShowAddNewNoteModal(true)}
      >
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <NoteCard
              note={note}
              className={styles.notePage}
              onDetail={() => {
                setNoteToDetail(note);
              }}
            />
          </Col>
        ))}
      </Row>

      {showAddNewNoteModal && (
        <AddNewNoteModal
          onHide={() => setShowAddNewNoteModal(false)}
          onSubmit={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNewNoteModal(false);
          }}
        />
      )}

      {noteToDetail && (
        <DetailNoteModal
          note={noteToDetail}
          onHide={() => setNoteToDetail(null)}
          onDelete={(deletedNote) => {
            setNotes(
              notes.filter(
                (existingNote) => existingNote._id !== deletedNote._id
              )
            );
            setNoteToDetail(null);
          }}
          onUpdate={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToDetail(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
