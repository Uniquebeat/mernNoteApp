import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
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
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNewNoteModal, setShowAddNewNoteModal] = useState(false);
  const [noteToDetail, setNoteToDetail] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowAddNewNoteModal(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  const notesGrid = (
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
  );

  return (
    <Container className="pt-4 pb-4">
      <Button
        className={`mb-4 ${utilStyles.Center}`}
        onClick={() => setShowAddNewNoteModal(true)}
      >
        Add new note
      </Button>

      {notesLoading && (
        <Spinner
          animation="border"
          variant="primary"
          className={utilStyles.Center}
        />
      )}

      {showNotesLoadingError && (
        <p className={utilStyles.TextCenter}>
          Something went wrong! Please refresh the page.
        </p>
      )}

      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            notesGrid
          ) : (
            <p className={utilStyles.TextCenter}>You don't have any note yet</p>
          )}
        </>
      )}

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
