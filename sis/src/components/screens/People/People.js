import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Left, Body, Title, Right, Thumbnail, ListItem } from 'native-base';

import { DateOptions, Theme, Styles } from '../../../appStyles.js'
import { SearchBar } from 'react-native-elements'
import { View, FlatList, ListView, TouchableOpacity, AsyncStorage } from "react-native";

const peopleList = [
  {
    id: 0,
    title: 'Prof. Dr.',
    name: 'Speks Butler',
    thumbnailUrl: 'https://images.pexels.com/photos/428341/pexels-photo-428341.jpeg?auto=compress&cs=tinysrgb&h=350',
    department: 'Faculty of Engineering',
    phone: '0484871148115',
    email: 'hognpeters@schoolEngineering.com',
    location: 'Engineering Building, Room 245',
    office_hours: 'Mon-Thurs 8am-5pm, Fri 8am-2pm'
  },
  {
    id: 1,
    title: 'Prof. Dr.',
    name: 'Amy Sandra',
    thumbnailUrl: 'https://amp.businessinsider.com/images/59bae2cd38d20d2a008b6447-750-563.jpg',
    department: 'Student Affairs',
    phone: '0548451547841',
    email: 'sandarakol@schoolSenate.com',
    location: 'Senate Building, Room 014, ',
    office_hours: 'Mon-Tue 8am-5pm, Fri 8am-5pm'
  },
]

export default class People extends Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      text: '',
      searchInput: '',
      isReady: false,
      people: [],
    }
  }


  componentWillMount() {

    this.setPeopleList();

  }

  async setPeopleList() {
    try {

      const people = await AsyncStorage.getItem('people');

      if (people !== null) {

        console.log(JSON.parse(people))

        this.setState({ people: JSON.parse(people), isReady: true })

      } else
        console.log('No data');
    } catch (error) {
      // Error retrieving data
      console.log('Error retrieving your data')
    }
  }


  render() {

    let people = this.state.people


    return (
      <Container style={Styles.ContainerStyle}>
        <Header hasTabs style={Styles.HeaderStyle}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>People</Title>
          </Body>
        </Header>

        {people === undefined || people === null || people.length < 1 ?

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

            <Icon name='pencil-box' type='MaterialCommunityIcons' style={{ fontSize: 80, color: 'gray' }} />
            <Text>No people found!</Text>

          </View>

          :

          <Content padder style={Styles.ContentStyle}>
            <SearchBar
              round
              showloading
              lightTheme
              containerStyle={{ backgroundColor: 'white', borderColor: 'white', borderWidth: 0, }}
              icon={{ type: 'font-awesome', name: 'search' }}
              onChangeText={(text) => this.setState({ searchInput: text })} // FIlter the list
              onCancel={(text) => this.filterSearch("")} // Restore the list
              placeholder='Search...' />
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={people.filter(item => (`${item.name.first} ${item.name.last}`).toUpperCase().includes(this.state.searchInput.toUpperCase()))}
              extraData={this.state.people}
              renderItem={({ item }) =>
                <ListItem
                  style={{ borderBottomWidth: 1 }}
                  onPress={() => this.props.navigation.navigate('Person', { person: item })} >
                  <Thumbnail square size={80} source={{ uri: item.thumbnailUrl }} />
                  <Body>
                    <Text note style={{ color: Theme.primaryColor }}>{item.title}</Text>
                    <Text title bold>{item.name.first + " " + item.name.last}</Text>
                    <Text note>{item.department}</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-arrow-forward" />
                  </Right>
                </ListItem>
              }
            />
          </Content>

        }
      </Container>
    );
  }
}
