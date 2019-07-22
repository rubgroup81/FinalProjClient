import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button style={{ backgroundColor: "#2e1534" }} variant="contained" color="secondary" {...bindTrigger(popupState)}>
            <MenuIcon />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} component={Link} to={"./Dashboard"}>דף הבית</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./WizFramingPic"}>מסגור תמונה</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./WizFramingMirror"}>מסגור מראה</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./CutMirrorGlass"}>חיתוך מראה/זכוכית</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./Kanvas_Test"}>תמונות קנבס</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./MyOrders"}>ההזמנות שלי</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./Register3"}>אזור אישי</MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./ShoppingCart"}><AddShoppingCartIcon />&nbsp; סל קניות </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./Login3"}> התחבר </MenuItem>
            <MenuItem onClick={popupState.close} component={Link} to={"./Register3"}> הרשם </MenuItem>

          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;