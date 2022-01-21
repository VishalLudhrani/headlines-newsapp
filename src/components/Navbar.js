import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    props.logoutFunc();
  };

  const redirectHome = () => {
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={redirectHome} style={{cursor: 'pointer'}}>
            Headlines - News on the go
          </Typography>
          {(props.user != null) ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={props.user.photoURL} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/preferences" style={{textDecoration: "none", color: "inherit"}}>
                  <MenuItem onClick={handleClose}>My Preferences</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={props.loginFunc}
              variant="outlined"
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
