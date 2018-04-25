import React from "react";
import { StatusBar, View, Image } from "react-native";
import TimeAgo from 'react-native-timeago';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import Expo from 'expo'

export default class NewsItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {

    let feed = this.props.navigation.state.params.feed;

    return (
      <Container style={{paddingTop: Expo.Constants.statusBarHeight, backgroundColor: 'white'}}>
        <View style={{height: 250}}>
          <Image source={{uri: feed.thumbnailUrl}} style={{width: null, flex: 1}}/>
          <Icon
              name='cancel'
              type='MaterialIcons'
              onPress={() => this.props.navigation.goBack()}
              style={{position: 'absolute', top:0, left: 0, margin: 20}}/>
        </View>
        <Content padder style={{padding: 20}}>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginVertical: 15, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#e83410', fontSize: 18}}>{feed.category.toUpperCase()}</Text>
            <TimeAgo time={feed.created_at} interval={20000} />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 20, marginVertical: 15,}} >{feed.title}</Text>
          <Text >{feed.body}</Text>

        </Content>
      </Container>
    );
  }
}
