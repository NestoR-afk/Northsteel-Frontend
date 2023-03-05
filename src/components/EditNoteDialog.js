import {
    Box,
    Button,
    Dialog,
    Select,
    TextField,
    MenuItem,
    IconButton,
    InputLabel,
    FormControl,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useState } from 'react'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function EditNoteDialog({ isOpened, onClose, noteData, onUpdateNote, onDeleteNote }) {

    const [note, setNote] = useState({ 
        'id': noteData.id, 
        'header': noteData.header, 
        'text': noteData.text, 
        'fontFamily': noteData.fontFamily
 });

    const [fontFamily, setFontFamily] = useState(noteData.fontFamily);

    const theme = React.useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily
                },
            }),
        [fontFamily],
    );

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        setFontFamily(selectedFont);
        setNote({...note, ['fontFamily']: selectedFont });
    };

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    const handleDelete = () => {
        onDeleteNote(note.id);
        handleClose();
    };

    const handleSubmit = () => {
        onUpdateNote(note, note.id);
        handleClose();
    };

    return (
        <Dialog open={isOpened} onClose={handleClose} fullScreen >
            <IconButton size='large'
                onClick={handleDelete}
                sx={{ position: 'absolute', right: 16, top: 16 }}>
                <a title='Удалить заметку'>
                    <DeleteIcon color='error' />
                </a>
            </IconButton>

            <DialogTitle sx={{display:'flex'}}>Редактирование заметки
            <Box sx={{ ml: 5 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel htmlFor="шрифт">шрифт</InputLabel>
                    <Select
                        value={fontFamily}
                        onChange={handleFontChange}
                        label="шрифт">
                        <MenuItem value="Roboto">Стандартный</MenuItem>
                        <MenuItem value="Comic Sans MS" sx={{fontFamily:"Comic Sans MS"}}>Comic Sans MS</MenuItem>
                        <MenuItem value="Lucida Console" sx={{fontFamily:"Lucida Console"}}>Lucida Console</MenuItem>
                        <MenuItem value="Segoe UI" sx={{fontFamily:"Segoe UI"}}>Segoe UI</MenuItem>
                        <MenuItem value="New York" sx={{fontFamily:"New York"}}>New York</MenuItem>
                        <MenuItem value="Georgia" sx={{fontFamily:"Georgia"}}>Georgia</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            </DialogTitle>

            <ThemeProvider theme={theme}>
                <DialogContent>
                    <TextField
                        autoFocus
                        defaultValue={note.header}
                        margin="dense"
                        name="header"
                        label="Заголовок"
                        onChange={handleChange}
                        type="text"
                        fullWidth/>
                    <TextField
                        margin="dense"
                        multiline
                        minRows={5}
                        defaultValue={note.text}
                        name="text"
                        label="Текст заметки"
                        onChange={handleChange}
                        type="text"
                        fullWidth/>
                </DialogContent>
            </ThemeProvider>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSubmit}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    )
}