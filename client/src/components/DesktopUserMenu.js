import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthFormModal from "./AuthFormModal";
import DarkModeMenuItem from "./DarkModeMenuItem";
import storageService from "../utils/localStorage";

import {
  Button,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import { useUserMenuStyles } from "../styles/muiStyles";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const DesktopUserMenu = ({ user, handleLogout }) => {
  const classes = useUserMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };

  const loggedUser = storageService.loadUser() || user;

  return (
    <div>
      {" "}
      {loggedUser ? (
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            <div>
              <Typography color="secondary"> {loggedUser.username} </Typography>{" "}
              <Typography variant="caption" className={classes.karmaWrapper}>
                <FilterVintageIcon
                  fontSize="inherit"
                  style={{ marginRight: "0.2em" }}
                  color="secondary"
                />{" "}
                {loggedUser.karma}
                karma{" "}
              </Typography>{" "}
            </div>{" "}
          </Button>{" "}
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to={`/u/${loggedUser.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile{" "}
              </ListItemIcon>{" "}
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout{" "}
                </ListItemIcon>{" "}
              </MenuItem>{" "}
              <Divider variant="middle" />
              <DarkModeMenuItem closeMenu={handleClose} />{" "}
            </MenuItem>{" "}
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthFormModal />
          <DarkModeMenuItem closeMenu={handleClose} navItem={true} />{" "}
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
