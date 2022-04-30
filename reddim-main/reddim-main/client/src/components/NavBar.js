import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logoutUser } from '../reducers/userRed';
import { notify } from '../reducers/notificationRed';
import MobileUserMenu from './MobileUserMenu';
import DesktopUserMenu from './DesktopUserMenu';
import SearchBar from './SearchBar';

import {
    AppBar,
    Toolbar,
    Button,
    useMediaQuery,
    IconButton,
} from '@material-ui/core';
import { useNavStyles } from '../styles/stylemui';
import { useTheme } from '@material-ui/core/styles';
import RedditIcon from '@material-ui/icons/Reddit';
import SearchIcon from '@material-ui/icons/Search';

const NavBar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useNavStyles();

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(notify(`u/${user.username} logged out`, 'success'));
    };

    return ( <
            AppBar position = "sticky"
            color = "inherit"
            elevation = { 1 } >
            <
            Toolbar disableGutters = { isMobile } > {!searchOpen && ( <
                    >
                    <
                    div className = { classes.leftPortion } >
                    <
                    div className = { classes.logoWrapper } >
                    <
                    Button className = { classes.logo }
                    color = "primary"
                    component = { RouterLink }
                    to = "/"
                    startIcon = { < RedditIcon fontSize = "large" / > }
                    size = "large" >
                    Reddim <
                    /Button>  < /
                    div > {!isMobile && < SearchBar / > } <
                    /div> {
                    isMobile ? ( <
                        >
                        <
                        IconButton color = "primary"
                        className = { classes.searchBtn }
                        onClick = {
                            () => setSearchOpen((prevState) => !prevState)
                        } >
                        <
                        SearchIcon / >
                        <
                        /IconButton> <
                        MobileUserMenu user = { user }
                        handleLogout = { handleLogout }
                        /> < / >
                    ) : ( <
                        DesktopUserMenu user = { user }
                        handleLogout = { handleLogout }
                        />
                    )
                } <
                />
            )
        } {
            searchOpen && isMobile && ( <
                SearchBar isMobile = { true }
                setSearchOpen = { setSearchOpen }
                />
            )
        } <
        /Toolbar> < /
    AppBar >
);
};

export default NavBar;