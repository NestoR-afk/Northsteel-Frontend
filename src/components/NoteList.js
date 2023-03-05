import {
    Card,
    Container,
    Typography,
    CardContent,
    CardActionArea,
} from "@mui/material";
import EditNoteDialog from "./EditNoteDialog";
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Note({ note, onUpdateNote, onDeleteNote }) {
    const [open, setOpen] = useState(false);
    const [fontFamily] = useState(note.fontFamily);

    const theme = createTheme({
        typography: {
            allVariants:{ fontFamily }
        },
    });

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <Card sx={{ mb: 2 }}>
            <CardActionArea >
                
                <CardContent onClick={ () => setOpen(true) }>
                <ThemeProvider theme={theme}>
                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                        {note.header}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {note.text.length > 65 ? note.text.substring(0, 65) + '...' : note.text}
                    </Typography>
                    </ThemeProvider>
                </CardContent>
            </CardActionArea>
            <EditNoteDialog isOpened = { open } onClose = {handleClose} noteData = {note} onUpdateNote = {onUpdateNote} onDeleteNote={onDeleteNote}/>
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
            <Note key={note.id} note={note} onDeleteNote={onDeleteNote} onUpdateNote={onUpdateNote}/>
        )
    });

    return (
        <Container maxWidth="sm">
            {rows}
        </Container>
    );
}