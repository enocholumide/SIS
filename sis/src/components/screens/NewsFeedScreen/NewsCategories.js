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

  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={{paddingTop: Expo.Constants.statusBarHeight}}>
          <Header>
            <Left>
              <Button transparent onPress={() =>
                  navigation.navigate( 'News',  {feeds: selectedCategories} )
                }>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Categories</Title>
            </Body>
            <Right />
          </Header>
        </View>
    )
  });
  render() {
    return (
      <Container  >
        <Content padder >
          <CustomMultiPicker
            options={categoryList}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={'#757575'}
            returnValue={"label"} // label or value
            callback={(res) => selectedCategories = res  } // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={40}
            rowRadius={5}
            iconColor={"#00a2dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            selected={selectedCategories} // list of options which are selected by default
          />
        </Content>
      </Container>
    );
  }
}
