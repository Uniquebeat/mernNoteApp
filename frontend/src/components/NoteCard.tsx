import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { NoteModel } from "../models/note";
import { formatDate } from "../util/formatDate";
import styles from "../styles/noteCard.module.css";

interface NoteCardProps {
  note: NoteModel;
  className: string;
  onDetail: () => void;
}

const NoteCard = ({ note, className, onDetail }: NoteCardProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={className} onClick={() => onDetail()}>
      <CardBody className={styles.cardBody}>
        <CardTitle>{title}</CardTitle>
        <CardText className={styles.cardText}>{text}</CardText>
      </CardBody>
      <CardFooter className={`text-muted ${styles.cardFooter}`}>
        {createdUpdatedText};
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
