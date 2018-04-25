import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import News from "./NewsFeed.js";
import NewsCategories from "./NewsCategories.js";

export default (DrawNav = StackNavigator(
  {
    News: {
      screen: News,
      navigationOptions: { header: false }
     },
    NewsCategories: {
      screen: NewsCategories,
    },
  },
  {
    initialRouteName: "News",
    headerMode: 'screen'
  }
));
