import {StackNavigator} from 'react-navigation';

import News from "./NewsFeed.js";
import NewsCategories from "./NewsCategories.js";
import NewsItem from "./NewsItem.js"

export const NewsStack = StackNavigator(
    {
      News: {
        screen: News,
        navigationOptions: { header: false }
       },
       NewsItem: {
         screen: NewsItem,
         navigationOptions: { header: false }
        },
      NewsCategories: {
        screen: NewsCategories,
        navigationOptions: { header: false }
      },
    },
    {
        headerMode: 'screen',
    }
);
