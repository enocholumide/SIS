import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./SideBar/SideBar.js";

import NewsScreen from '../screens/News/index.js';
import PeopleScreen from '../screens/People/index.js'

export default (DrawNav = DrawerNavigator (
  {
    News: {
      screen: NewsScreen,
      navigationOptions: { header: false }
    },
    People: {
      screen: PeopleScreen,
      navigationOptions: { header: false }
     }
  },
  {
    contentComponent: props => <SideBar {...props} />
  },
  {
    initialRouteName: "News",
    headerMode: 'screen'
  }
));
