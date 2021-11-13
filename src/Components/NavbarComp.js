import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles'
import { Avatar, CardHeader, SwipeableDrawer } from '@mui/material';
import clsx from 'clsx';
import { Link } from 'react-router-dom'
import {AuthProvider,useAuth} from '../Contexts/AuthProvider'
import {FaCheckCircle} from 'react-icons/fa'
import { MdVerified} from "react-icons/md";
import FoodBankIcon from '@mui/icons-material/FoodBank';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1
    },
    menuButton: {
        top:-3,
        right:5
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 'auto',
        minWidth:250
    },
    fullList: {
        width: 'auto',
    },
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function NavbarComp () {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);

const { currentUser, logout } = useAuth()

  async function handleLogout() {
      await logout()
  }

const handleChange = (event) => {
    setAuth(event.target.checked);
};

const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};


    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
           
            <List>
                
        <CardHeader 
        avatar={
          <Avatar  src={currentUser?.photoURL} sx={{ width: 62, height: 62 }} aria-label="recipe">
          </Avatar>
        }
        title={(currentUser?.displayName)?currentUser?.displayName:currentUser?.email}
      /> 
                {['Home',
 
                 (currentUser?.email === 'gokulpollachi25@gmail.com' || 
                    currentUser?.displayName === 'Gokul L' ||
                    currentUser?.email === 'skillgallery75@gmail.com'
                 )?

                'admin'
                :
                'my uploads'
                ,
                'login'].map((text, index) => (
                    <ListItem button key={text}>
                        <Link to={(text === 'Home')? '/':(text === 'admin')? '/admin':`/${text}`} style={{color:'black',textDecoration:'None'}}>
                            <ListItemText primary={text} />
                        </Link>
                    </ListItem>
                ))}
            </List>{/* 
            <Divider /> */}
          {/*    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
            {/* <List color="text.secondary">
                {[ 'Contact', 'About', 'Gallery'].map((text, index) => (
                    <ListItem button key={text}>
                        <Link to={text} style={{color:'black',textDecoration:'None'}}>
                        <ListItemText primary={text} />
                        </Link>
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    return (
        <div className={classes.root} color="secondary">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"> 
                    <div>
                        {['left'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <MenuIcon onClick={toggleDrawer(anchor, true)} />
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>
                                
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    {/* https://cdn.vectorstock.com/i/1000x1000/28/24/heart-on-plate-fork-and-knife-icon-isolated-vector-24062824.jpg */}  
                    <FoodBankIcon sx={{fontSize:42,mr:1}}/>
                        Appetizing Recipes
                    </Typography>
                    
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                
                {(currentUser?.photoURL)?
                 <Avatar src={currentUser.photoURL} sx={{ width: 42, height: 42 }}>M</Avatar>
                 :
                <AccountCircle />
                }
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
        
              {
                (currentUser?.email)?
                <MenuItem>
                {(currentUser?.displayName)?
                  currentUser.displayName
                  :
                  currentUser?.email
                }
                {
                    (currentUser?.email === 'gokulpollachi25@gmail.com' || 
                    currentUser?.displayName === 'Gokul L' ||
                    currentUser?.email === 'skillgallery75@gmail.com'
                    )
                    ?
                    <MdVerified style={{marginLeft:'5px',color:'#3897F0'}} size="16px"/>  
                    :
                    (currentUser?.emailVerified)?
                    <FaCheckCircle style={{marginLeft:'5px',color:'#7A7D82'}} size="16px"/>
                    :
                    null
                }    
                </MenuItem>
                :
                <MenuItem>
                   welcome chef!
                </MenuItem>
               }
               {
                (currentUser?.email)?
                <MenuItem onClick={handleLogout}>    
                log out
                </MenuItem>
                :
                <MenuItem>
                   <Link to="/login" style={{color:'black',textDecoration:'None'}}>
                     login
                   </Link>
                </MenuItem>
               } 
                </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

