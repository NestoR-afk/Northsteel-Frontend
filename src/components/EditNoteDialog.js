import {
    Box,
    Grid,
    Stack,
    Button,
    Dialog,
    Select,
    MenuItem,
    ImageList,
    ImageListItem,
    TextField,
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
import { PhotoCamera } from '@mui/icons-material';


export default function EditNoteDialog({ isOpened, onClose, noteData, onUpdateNote, onDeleteNote }) {
    const minFontSize = 16;
    const maxFontSize = 40;
    const fontSizeChangeValue = 3;

    const [note, setNote] = useState({
        'id': noteData.id,
        'header': noteData.header,
        'text': noteData.text,
        'fontFamily': noteData.fontFamily,
        'fontSize': noteData.fontSize,
        'image': noteData.image
    });
    const [fontFamily, setFontFamily] = useState(noteData.fontFamily || 'Roboto');
    const [fontSize, setFontSize] = useState(noteData.fontSize || 16);
    const [img, setImg] = useState(noteData.image || '');
    

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        setFontFamily(selectedFont);
        setNote({ ...note, 'fontFamily': selectedFont });
    };

    const handleClose = () => {
        onClose();
    };

    const handleChangeTextField = (event) => {
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

    const handleFontSizeIncrease = () => {
        if (fontSize >= maxFontSize) {
            return;
        }
        setFontSize(fontSize + fontSizeChangeValue);
        setNote({ ...note, 'fontSize': fontSize });
    }

    const handleFontSizeDecrease = () => {
        if (fontSize <= minFontSize) {
            return;
        }
        setFontSize(fontSize - fontSizeChangeValue);
        setNote({ ...note, 'fontSize': fontSize });
    }

    return (
        <Dialog open={isOpened} onClose={handleClose} fullScreen >
            <IconButton size='large'
                onClick={handleDelete}
                sx={{ position: 'absolute', right: 16, top: 16 }}>
                <a title='Удалить заметку'>
                    <DeleteIcon color='error' />
                </a>
            </IconButton>

            <DialogTitle sx={{ display: 'flex' }}>Редактирование заметки
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

                <IconButton color="primary" component="label" sx={{ height: '40px', mt: 2, mx: 4 }}>
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item container direction="column" sm={img == '' ? 12 : 8}>
                        <TextField
                            inputProps={{
                                style: { fontSize: fontSize, fontFamily: fontFamily, lineHeight: 1 }
                            }}
                            autoFocus
                            defaultValue={note.header}
                            margin="dense"
                            name="header"
                            label="Заголовок"
                            onChange={handleChangeTextField}
                            type="text"
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
                            onChange={handleChangeTextField}
                            type="text"
                        />
                    </Grid>
                    <Grid item sm={4} >
                        <ImageList sx={{ height: 'auto', overflow:'scroll', display: img == '' ? 'none' : 'inline'}} cols={1}>
                            <ImageListItem>
                                <img
                                    src={"data:image/png;base64," + img}
                                />
                            </ImageListItem>
                        </ImageList>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ alignItems: 'center' }}>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSubmit}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    )
}