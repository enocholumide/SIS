import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';

import {
  Button,
  Text,
  Container,
  Card,
  CardItem, Thumbnail,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right, Tab, Tabs, ScrollableTab, List, ListItem, Form, Item, Input
} from "native-base";
import { DateOptions, Theme, Styles } from '../../../appStyles.js'
import CalendarStrip from 'react-native-calendar-strip';


var scheduleSurveyingMaster2 = [
  {
    title: 'Surveying 546',
    time: '2018-04-27T15:22:08.002Z',
    lecturer: 'Prof Beets Long',
    status: 'Lecture cancelled'
  },
  {
    title: 'Surveying 550',
    time: '2018-04-27T15:23:20.706Z',
    lecturer: 'Prof Palina Fricks',
    status: 'OK'
  }
];

var scheduleCivilBachelor6 = [
  {
    title: 'Introduction to Civil Engineering 101',
    time: '2018-04-27T15:22:08.002Z',
    lecturer: 'Prof Beets Long',
    status: 'Lecture cancelled'
  },
  {
    title: 'Building Design 102',
    time: '2018-04-27T15:23:20.706Z',
    lecturer: 'Prof Palina Fricks',
    status: 'OK'
  }
];


export default class Schedule extends Component {

  constructor(props) {
    super(props);

    //console.log(this.props.navigation.state.params)

    this.state = {
      currentDate: new Date(),
      schedule: {
        course_id:
          this.props.navigation.state.params == undefined ? 'CVLENGBACH' :  // Get the student course id and semester later
            this.props.navigation.state.params.data.current_id,
        //semester: this.props.navigation.state.params == undefined ? 6 : this.props.navigation.state.params.data.current_semester
      }
    }
  }

  changeDateToToday() {
    let date = new Date();
    this.dateStrip.setSelectedDate(date);
    this.setState({ currentDate: date })
  }

  getSchedule(course_id, selectedDate) {

    var selectedDate = moment(selectedDate).format("L").toString();
    var today = moment(new Date()).format("L").toString();

    if (selectedDate === today) {

      if (course_id === 'SURVMAST') { // Surveying {
        return scheduleSurveyingMaster2;
      }

      if (course_id === 'CVLENGBACH') { // Civil engineering  {
        return scheduleCivilBachelor6;
      }

      return undefined

    } else {
      return undefined
    }
  }

  renderSchedule(schedule) {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={schedule}
        renderItem={({ item, index }) =>
          <ListItem >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Body>
                <Text
                  note
                  numberOfLines={1}
                  style={{ color: Theme.primaryColor }}>
                  {moment(item.time).format("dddd, MMMM Do YYYY")}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {item.title}
                </Text>
                <Text note numberOfLines={1}>{item.lecturer}</Text>
                {item.status !== 'OK' ?
                  <Text note numberOfLines={1} style={{ color: Theme.primaryColor, fontWeight: 'bold' }}>{item.status}</Text>
                  : null
                }
              </Body>
              <Right>
                <TimeAgo time={item.time} interval={20000} />
              </Right>
            </View>
          </ListItem>
        }
      />
    );
  }


  render() {



    let schedule = this.getSchedule(
      this.state.schedule.course_id,
      this.state.currentDate
    );

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
            <Title>Lectures</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.changeDateToToday()}>
              <Icon name="today" type='MaterialIcons' />
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("SavedCourses", { current_id: this.state.schedule.course_id, semester: 6 })}>
              <Icon name="settings" type='MaterialIcons' />
            </Button>
          </Right>
        </Header>

        <Content style={{ backgroundColor: 'white', flex: 1 }}>
          <CalendarStrip
            ref={(dateStrip) => this.dateStrip = dateStrip}
            calendarColor={Theme.primaryColor}
            startingDate={new Date()}
            dateNumberStyle={{ color: 'black' }}
            dateNameStyle={{ color: 'black' }}
            highlightDateNumberStyle={{ color: 'white' }}
            onDateSelected={(date) => this.setState({ currentDate: date })}
            updateWeek={true}
          />
          <View style={{ flex: 1, margin: 5 }}>

            {(schedule === undefined || schedule === null || schedule.length < 1) ?
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='md-calendar' style={{ fontSize: 80, color: 'gray' }} />
                <Text>No schedule found!</Text>
              </View> :
              this.renderSchedule(schedule)}
          </View>
        </Content>


      </Container>
    );
  }
}