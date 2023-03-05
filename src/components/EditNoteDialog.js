import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditNoteDialog({ noteData, onUpdateNote, onDeleteNote }) {

    const [open, setOpen] = useState(false)
    const [initNote] = useState({ 'id': noteData.id, 'header': noteData.header, 'text': noteData.text });
    const [note, setNote] = useState({ 'id': noteData.id, 'header': noteData.header, 'text': noteData.text });

    const handleClose = () => {
        setOpen(false);
        setNote(initNote);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const handleDelete = () => {
        onDeleteNote(note.id);
        setOpen(false);
    }

    const handleSubmit = () => {
        onUpdateNote(note, note.id);
        setOpen(false);
    }

    return (
        <>
            <EditIcon size='large'
                onClick={handleOpen}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Редактирование заметки</DialogTitle>
                <IconButton size='large'
                    onClick={handleDelete}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16
                    }}>
                        <a title='Удалить заметку'>
                    <DeleteIcon color='error'/>
                    </a>
                </IconButton>
                <DialogContent>
                    <TextField
                        autoFocus
                        defaultValue={note.header}
                        margin="dense"
                        name="header"
                        label="Заголовок"
                        onChange={handleChange}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        multiline
                        minRows={5}
                        defaultValue={note.text}
                        name="text"
                        label="Текст заметки"
                        onChange={handleChange}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}