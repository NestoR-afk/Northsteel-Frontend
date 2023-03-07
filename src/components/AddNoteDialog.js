import {
    Box,
    Stack,
    Button,
    Dialog,
    Select,
    MenuItem,
    TextField,
    IconButton,
    InputLabel,
    FormControl,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import React, { useState } from 'react';

export default function AddNoteDialog({ onAddNote }) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({ header: '', text: '', fontFamily: 'Roboto', fontSize: 16 });
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontSize, setFontSize] = useState(16);
    const minFontSize = 16;
    const maxFontSize = 40;
    const fontSizeChangeValue = 3;

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

    const handleFontSizeIncrease = () => {
        if (fontSize >= maxFontSize) {
            return;
        }
        setFontSize(fontSize => fontSize + fontSizeChangeValue);
        setNote({ ...note, 'fontSize': fontSize });
    }

    const handleFontSizeDecrease = () => {
        if (fontSize <= minFontSize) {
            return;
        }
        setFontSize(fontSize => fontSize - fontSizeChangeValue);
        setNote({ ...note, 'fontSize': fontSize });
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Создать</Button>
            <Dialog open={open} onClose={handleClose} fullScreen>
                <DialogTitle sx={{ display: 'flex' }}>Новая заметка
                    <Box sx={{ minWidth: 120, ml: 5 }}>
                        <FormControl>
                            <InputLabel htmlFor="шрифт">шрифт</InputLabel>
                            <Select
                                value={fontFamily}
                                onChange={handleFontChange}
                                label="шрифт">
                                <MenuItem value="Roboto">Стандартный</MenuItem>
                                <MenuItem value="Times New Roman" sx={{ fontFamily: "Times New Roman" }}>Times New Roman</MenuItem>
                                <MenuItem value="Comic Sans MS" sx={{ fontFamily: "Comic Sans MS" }}>Comic Sans MS</MenuItem>
                                <MenuItem value="Lucida Console" sx={{ fontFamily: "Lucida Console" }}>Lucida Console</MenuItem>
                                <MenuItem value="Segoe UI" sx={{ fontFamily: "Segoe UI" }}>Segoe UI</MenuItem>
                                <MenuItem value="Georgia" sx={{ fontFamily: "Georgia" }}>Georgia</MenuItem>
                            </Select>

                        </FormControl>
                        <Stack direction="row">
                            <Button onClick={handleFontSizeDecrease} sx={{ width: '50%', fontSize: 20 }}  >-</Button>
                            <Button onClick={handleFontSizeIncrease} sx={{ width: '50%', fontSize: 20 }} >+</Button>
                        </Stack>
                    </Box>

                    <IconButton color="primary" component="label" sx={{mx:4, mt:1, height:'50px'}}>
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        inputProps={{
                            style: { fontSize: fontSize, fontFamily: fontFamily, lineHeight: 1 }
                        }}
                        autoFocus
                        defaultValue={note.header}
                        margin="dense"
                        name="header"
                        label="Заголовок"
                        onChange={handleChange}
                        type="text"
                        fullWidth
                        multiline
                    />
                    <TextField
                        inputProps={{
                            style: { fontSize: fontSize, fontFamily: fontFamily, lineHeight: 1 }
                        }}
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