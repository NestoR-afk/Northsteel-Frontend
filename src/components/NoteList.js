import {
    Card,
    Container,
    Typography,
    CardContent,
    CardActionArea,
} from "@mui/material";
import EditNoteDialog from "./EditNoteDialog";
import { useState } from 'react'

function Note({ note, onUpdateNote, onDeleteNote }) {
    const [open, setOpen] = useState(false);
    const [fontFamily] = useState(note.fontFamily);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card sx={{ mb: 2 }}>
            <CardActionArea >
                <CardContent onClick={() => setOpen(true)}>
                    <Typography sx={{ fontSize: 18, fontFamily: fontFamily }} >
                        {note.header}
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontFamily: fontFamily }} color="text.secondary">
                        {note.text.length > 65 ? note.text.substring(0, 65) + '...' : note.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <EditNoteDialog isOpened={open} onClose={handleClose} noteData={note} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} />
        </Card>
    )
}

export default function NoteList({ notes, onUpdateNote, onDeleteNote, filterText }) {
    const rows = notes.map(note => {
        if (note.header.toLowerCase().includes(filterText.toLowerCase())
            || note.text.toLowerCase().includes(filterText.toLowerCase())) {
             return <Note key={note.id} note={note} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote} />
        }
    });

    return (
        <Container maxWidth="sm">
            {rows}
        </Container>
    );
}