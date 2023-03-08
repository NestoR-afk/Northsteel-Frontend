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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from 'react';

export default function AddNoteDialog({ onAddNote }) {
    const minFontSize = 16;
    const maxFontSize = 40;
    const fontSizeChangeValue = 3;

    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({ header: '', text: '', fontFamily: 'Roboto', fontSize: 16, image: null });
    const [fontFamily, setFontFamily] = useState('Roboto');
    const [fontSize, setFontSize] = useState(minFontSize);
    const [img, setImg] = useState('');

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        setFontFamily(selectedFont);
        setNote({ ...note, 'fontFamily': selectedFont });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangeTextField = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        onAddNote(note);
        handleClose();
        setNote({});
        setImg('');
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

    const handleImageUpload = (e) => {
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }

    const handleReaderLoaded = (e) => {
        let base64String = btoa(e.target.result);
        setImg(base64String);
        setNote({ ...note, 'image': base64String })
    }

    const handleDeleteImage = () => {
        setImg('');
        setNote({ ...note, 'image': '' })
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
                    <form onChange={handleImageUpload}>
                        <IconButton color="primary" component="label" sx={{ mx: 4, mt: 1, height: '50px' }}>
                            <input hidden multiple accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </form>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item container direction="column" sm={img === '' ? 12 : 8}>
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
                                multiline/>
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
                                type="text"/>
                        </Grid>
                        <Grid item sm={4}>
                            <ImageList sx={{ height: 'auto', display: img === '' ? 'none' : 'inline' }} cols={1} >
                                <ImageListItem>
                                    <IconButton
                                        onClick={handleDeleteImage}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                        }}>
                                        <CloseIcon color="primary" />
                                    </IconButton>
                                    <img src={"data:image/png;base64," + img} />
                                </ImageListItem>
                            </ImageList>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}