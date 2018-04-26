import Expo from 'expo';
import React from "react";
import { AppRegistry, Alert } from "react-native";
import CustomMultiPicker from "react-native-multiple-select-list";
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  View
} from "native-base";

import { Theme, Styles } from '../../../appStyles.js'

const categoryList = {
  "122":"Architecture",
  "123":"Computer Science",
  "124":"Surveying",
  "125":"Urban and Regional Planning"
}

const selectedCategories = [];

export default class NewsCategories extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container style={[Styles.ContainerStyle]}>
        <Header hasTabs style={Styles.HeaderStyle}>
          <Left>
            <Button transparent onPress={() =>
                this.props.navigation.navigate( 'News',  {feeds: selectedCategories} )
              }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Categories</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={{backgroundColor: 'white'}}>
          <CustomMultiPicker
            options={categoryList}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={'#757575'}
            returnValue={"label"} // label or value
            callback={(res) => selectedCategories = res  } // callback, array of selected items
            rowBackgroundColor={"white"}
            rowHeight={40}
            rowRadius={5}
            iconColor={Theme.primaryColor}
            iconSize={30}
            selectedIconName={"ios-checkmark-outline"}
            //unselectedIconName={"ios-radio-button-off-outline"}
            selected={selectedCategories} // list of options which are selected by default
          />
        </Content>
      </Container>
    );
  }
}
