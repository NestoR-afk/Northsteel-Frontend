import {
    Card,
    Container,
    Typography,
    CardContent,
    CardActionArea
} from "@mui/material";
import EditNoteDialog from "./EditNoteDialog";

function Note({ note, onUpdateNote, onDeleteNote }) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardActionArea >
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                        {note.header}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {note.text.length > 70 ? note.text.substring(0, 70) + '...' : note.text}
                    </Typography>
                    <EditNoteDialog noteData={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default function NoteList({ notes, onUpdateNote, onDeleteNote, filterText }) {
    const rows = [];

    notes.forEach(note => {
        if (note.header.toLowerCase().indexOf(filterText.toLowerCase()) === -1
            && note.text.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }
        rows.push(
            <Note key={note.id} note={note} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote}> </Note>
        )
    });

    return (
        <Container maxWidth="sm">
            {rows}
        </Container>
    );
}