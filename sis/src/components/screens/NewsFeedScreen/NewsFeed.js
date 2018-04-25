import React from "react";
import { StatusBar } from "react-native";
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

export default class NewsFeed extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props)
  }

  render() {
    return (
      <Container style={{paddingTop: Expo.Constants.statusBarHeight}}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>News Feed here</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("NewsCategories")}>
            <Text>Goto Categories</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
