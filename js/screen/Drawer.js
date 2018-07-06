/**
 * author: Martin SD
 * Declare screens in menu
 */
import React from "react";
import { DrawerNavigator } from "react-navigation";

import SideBar from "./sidebar";   //left menu
import Home from "./home";

const DrawerMenu = DrawerNavigator(
  {
    Home: {screen: Home},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerMenu;
