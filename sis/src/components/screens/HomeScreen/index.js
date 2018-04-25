import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import NewsFeed from "../NewsFeedScreen/index.js"
import SideBar from "../../navigation/SideBar/SideBar.js";
import { DrawerNavigator, StackNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    News: { screen: NewsFeed },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);



export default HomeScreenRouter;
