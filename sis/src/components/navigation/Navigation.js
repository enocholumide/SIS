import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./SideBar/SideBar.js";
import { Root } from "native-base";

import NewsScreen from '../screens/News/index.js';
import PeopleScreen from '../screens/People/index.js';
import LecturesScreen from '../screens/Lectures/index.js';
import GradesScreen from '../screens/Grades/index.js';
import ExamsScreen from '../screens/Exams/index.js'

const AppNavigator = DrawerNavigator (
  {
    Exams: {
      screen: ExamsScreen,
      navigationOptions: { header: false }
     },
    News: {
      screen: NewsScreen,
      navigationOptions: { header: false }
    },
    People: {
      screen: PeopleScreen,
      navigationOptions: { header: false }
     },
     Lectures: {
      screen: LecturesScreen,
      navigationOptions: { header: false }
     },
     Grades: {
      screen: GradesScreen,
      navigationOptions: { header: false }
     },

  },
  {
    contentComponent: props => <SideBar {...props} />
  },
  {
    initialRouteName: "Exams",
    headerMode: 'screen'
  }
);


export default () =>
  <Root>
    <AppNavigator />
  </Root>;

 