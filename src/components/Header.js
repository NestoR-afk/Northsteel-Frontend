import { 
    Box, 
    AppBar, 
    Toolbar, 
    InputBase,
    Typography
 } from "@mui/material";
import mainLogo from "../logo.png";
import AddNoteDialog from './AddNoteDialog';

function Logo() {
    return (
        <img src={mainLogo} width="50px" alt='' />
    );
}

export default function Header({ onAddNote, filterText, setFilterText }) {
    return (
        <AppBar position="sticky" color="inherit" sx={{ mb: 2, borderRadius: 2 }}>
            <Toolbar >
                <Logo />
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Заметки
                </Typography>
                <InputBase sx={{
                    backgroundColor: '#f6f6f6',
                    borderRadius: 5,
                    paddingLeft: '1em',
                    '&:hover': {
                        backgroundColor: '#e6e6e6'
                    }
                    }}
                    placeholder="Поиск..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}/>
                <Box sx={{ flexGrow: 1 }} />
                <AddNoteDialog onAddNote={onAddNote} />
            </Toolbar>
        </AppBar>
    );
}