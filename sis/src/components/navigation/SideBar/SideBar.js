import React from "react";
import { AppRegistry, Image, StatusBar, View } from "react-native";

import CustomMultiPicker from "react-native-multiple-select-list"

import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

const main_routes = [
  {
    title: 'News',
    icon: {name: 'rss-feed', type: 'MaterialIcons'}
  },
  {
    title: 'People',
    icon: {name: 'ios-people', type: 'Ionicons'}
  },
  {
    title: 'Lectures',
    icon: {name: 'chair-school', type: 'MaterialCommunityIcons'}
  },
  {
    title: 'Grades',
    icon: {name: 'ios-school', type: 'Ionicons'}
  },
  {
    title: 'Exams',
    icon: {name: 'pencil-square', type: 'FontAwesome'}
  },
  {
    title: 'Courses',
    icon: {name: 'open-book', type: 'Entypo'}
  },
  {
    title: 'Jobs',
    icon: {name: 'work', type: 'MaterialIcons'}
  }
];

const other_routes = [

  {
    title: 'Settings',
    icon: {name: 'cog', type: 'Ionicons'}
  },
  {
    title: 'Feedback',
    icon: {name: 'feedback', type: 'MaterialIcons'}
  },
  {
    title: 'Legal Notice',
    icon: {name: 'legal', type: 'FontAwesome'}
  },
]

const userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin"
}


export default class SideBar extends React.Component {


  constructor(props){
    super(props);

  }



componentDidMount() {
  console.log('Side Bar did mount')
}

  render() {

    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 150,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          />
          {this.renderList(main_routes, 150)}

          {this.renderList(other_routes, 0)}
        </Content>
      </Container>
    );
  }


  renderList(list, marginTop){
    return(
      <List
        dataArray={list}
        contentContainerStyle={{ marginTop: marginTop }}
        renderRow={data => {
          return (
            <ListItem
              button
              onPress={() => this.props.navigation.navigate(data.title)}
              style={{borderBottomWidth: 0}} >
              <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Icon name={data.icon.name} type={data.icon.type} style={{color:'gray', fontSize: 18, marginRight: 18}}/>
                <Text >{data.title} </Text>
              </View>
            </ListItem>
          );
        }}
      />
    )
  }
}
