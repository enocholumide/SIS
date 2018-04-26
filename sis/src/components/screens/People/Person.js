import React from "react";
import { StatusBar, View, Image, ImageBackground, TouchableHighlight, FlatList } from "react-native";
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
  Right, Thumbnail, ListItem
} from "native-base";
import Expo from 'expo'

export default class NewsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let person = this.props.navigation.state.params.person;

    let details = [
      name      = { text: person.title + person.name, icon:{name:'person', type:'MaterialIcons', color: "#4CDA64"} },
      location  = { text: person.location, icon:{name:'account-location', type:'MaterialCommunityIcons', color: "#FF9501" } },
      email     = { text: person.email, icon:{name:'email', type:'MaterialCommunityIcons', color: "#50B948"}},
      phone     = { text: person.phone, icon:{name:'phone-square', type:'FontAwesome', color: "#007AFF"} },
      office_hours     = { text: person.office_hours, icon:{name:'calendar-clock', type:'MaterialCommunityIcons', color: "#FD3C2D"} },
    ]

    return (
      <Container style={{ paddingTop: Expo.Constants.statusBarHeight, backgroundColor: 'white' }}>
        <ImageBackground  
          source={{ uri: person.thumbnailUrl }} 
          style={{ height: 250, alignItems: 'center', justifyContent: 'center' }} blurRadius={0}> 
          <Icon
            name='cancel'
            type='MaterialIcons'
            onPress={() => this.props.navigation.goBack()}
            style={{ position: 'absolute', top: 0, left: 0, margin: 20 }} />
        </ImageBackground>

       
        <Content padder style={{marginVertical: 15}} >

          <FlatList
             keyExtractor={(item, index) => index.toString()}
             data={details}
             renderItem = {({item}) =>
             <ListItem icon>
             <Left>
                <Button style={{ backgroundColor: item.icon.color }}>
                  <Icon name={item.icon.name} type={item.icon.type} />
                </Button>
              </Left>
              <Body>
                <Text>{item.text}</Text>
              </Body>
            </ListItem>
             }
           />
        </Content>
      </Container>
    );
  }
}
