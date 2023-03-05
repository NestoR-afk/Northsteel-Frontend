import {
    Box,
    Button,
    Dialog, 
    Select,
    MenuItem,
    TextField, 
    InputLabel,
    FormControl,
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    } from '@mui/material';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function AddNoteDialog({ onAddNote }) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({ header: '', text: '', fontFamily: 'Roboto'});
    const [fontFamily, setFontFamily] = useState('Roboto');

    const theme = React.useMemo(
        () =>
            createTheme({
                typography: {
                    allVariants:{ fontFamily }
                },
            }),
        [fontFamily],
    );

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        setFontFamily(selectedFont);
        setNote({ ...note, ['fontFamily']: selectedFont });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        onAddNote(note);
        handleClose();
        setNote({})
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Создать</Button>
            <Dialog open={open} onClose={handleClose} fullScreen>
                <DialogTitle sx={{display:'flex'}}>Новая заметка
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
                </ThemeProvider>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}