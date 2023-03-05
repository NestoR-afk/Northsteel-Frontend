import { Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button } from '@mui/material';
import React, { useState } from 'react'


export default function AddNoteDialog({ onAddNote }) {
    const [open, setOpen] = useState(false)
    const [note, setNote] = useState({ header: '', text: '' })

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        onAddNote(note);
        handleClose();
        setNote({})
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Создать</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Новая заметка</DialogTitle>
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