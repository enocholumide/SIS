import React from "react";
import { StatusBar, View, Image, StyleSheet } from "react-native";
import { Constants } from 'expo';
import NewsItem from './NewsItem.js'

import {
  Button,
  Text,
  Container,
  Card,
  CardItem,Thumbnail,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right, Tab, Tabs, ScrollableTab,
                    List,
                    ListItem
} from "native-base";
import Expo from 'expo';

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

export default class NewsFeed extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.navigation)
    this.state = {
      feeds : ['News']
    }
  }

  render() {

    var feeds = ['News'];
    if(this.props.navigation.state.params){
      if(this.props.navigation.state.params.feeds){
        feeds = feeds.concat(this.props.navigation.state.params.feeds);
      }
    }
    this.state.feeds = feeds;

    return (
      <Container style={{paddingTop: Expo.Constants.statusBarHeight, backgroundColor: '#E91E63'}}>
        <Header hasTabs style={{backgroundColor: '#E91E63'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen", this.state)}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>News</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("NewsCategories")}>
              <Icon name="options" type='SimpleLineIcons' />
            </Button>
          </Right>
        </Header>

        <Tabs
          style={{backgroundColor:'#E91E63',justifyContent:'flex-start'}}
          renderTabBar={()=> <ScrollableTab />} >
            {feeds.map((feed) => (
              <Tab
                  heading={feed}
                  key={feeds.indexOf(feed)}
                  tabStyle={{backgroundColor:'#E91E63'}}
                  activeTabStyle={{backgroundColor:'#E91E63'}} >
                {this.renderNewsItem(feed)}
              </Tab>
            ))}
        </Tabs>

      </Container>
    );
  }

  renderNewsItem(feedCategory) {

    // Select news from databaase where category is equals to feed Category

    // Demo data
    var feeds = [
      {
        id: 0,
        title: "Main Library Study Room are Now Open 24 Hours",
        body: "All Areas of the Main Library Study Room are Now Open 24 Hours. From now on, all areas of the Main Library Study Room are open 24 hours. Laptop use is allowed in Area A, but banned in Area B and C. ",
        thumbnailUrl: "http://radioilijas.ba/wp-content/uploads/2016/04/books-in-home-library.jpg",
        created_at: '2018-04-25T18:39:20.526Z',
        category: feedCategory
      },
      {
        id: 1,
        title: "New Clinic Instructor Mrs. Wisnieski, BSN, RN. says Hello!",
        body: "Mrs. Wisnieski, BSN, RN. Hello! I am very proud to be the School Nurse at Reagan Middle School since it opened in 2012. I have been a nurse 20 plus years. The majority of my career has been in pediatrics. This is my sixth year as a school nurse in PWCS, and my fourth year as the Reagan Middle",
        thumbnailUrl: "https://www.binghamton.edu/news/images/uploads/features/BaidooDavisDeshler.jpg",
        created_at: '2018-04-25T18:32:14.780Z',
        category: feedCategory
      }
    ];

    let dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return (
      <Content>
        <List
          dataArray={feeds}
          //contentContainerStyle={{ marginTop: marginTop }}
          renderRow={feed => {
            return (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate('NewsItem', {feed: feed})}
                style={{borderBottomWidth: 1}} >
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Thumbnail square source={{uri: feed.thumbnailUrl}} />
                  <Body>
                    <Text note numberOfLines={1}>{(new Date(feed.created_at)).toLocaleString('en-us', dateOptions)}</Text>
                    <Text numberOfLines={2} style={{fontWeight: 'bold'}}>{feed.title}</Text>
                  </Body>

                </View>

              </ListItem>
            );
          }}
        />
      </Content>
    )

  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: '#E91E63',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#C2185B',         // Darker background for content area
  },
  // Content header
  header: {
    margin: 10,                         // Add margin
    color: '#FFFFFF',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 2,                       // Bigger font size
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'center',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
});
