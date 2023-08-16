import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from 'react-router-dom'

const TopBar = () => {

    const useStyles = makeStyles(theme => ({
        mainDiv: {
            padding: theme.spacing(2),
            backgroundColor: "black"
        }
    }))

    const classes = useStyles()

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function deleteItem(key) {
        localStorage.removeItem(key);
    }

    const handleLogout = () => {
        deleteItem('cred');

        navigate('/')
        // window.location.href = 'https://dev.swiftpropertyauctions.co.uk/';
        handleMenuClose();
    };

    return (
        <AppBar position="static" className={classes.mainDiv} style={{backgroundColor: "#1D242A"}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <img onClick={e => {
                        navigate('/')
                    }} src={"/logo.svg"} alt="Logo" style={{cursor: "pointer", width: "190px", height: "70px"}}/>
                </Typography>

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;