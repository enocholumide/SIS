import React, { Component } from 'react';
import {
  ActionSheet,
  Body, Button,
  CheckBox, Container, Content, 
  Form, Fab,
  Header,
  Icon, Item, Input,
  List, Left, ListItem,
  Right,
  Segment, 
  Title,Text,
  Picker 
} from 'native-base';
import { Theme, Styles } from '../../../appStyles.js';
import { SearchBar } from 'react-native-elements';
import { View, FlatList, ListView, TouchableOpacity } from "react-native";

const saved_courses = {
  selected: 'SURVMAST',
  selected_semester: 1,
  courses: [
    {
      course_id: 'SURVMAST',
      title: 'Surveying',
      level: 'Master',
      semester: 1,
    },
    {
      course_id: 'CVLENGBACH',
      title: 'Civil Engineering',
      level: 'Bachelor',
      semester: 6,
    }
  ]
};

const all_courses = [
  {
    course_id: 'SURVMAST',
    title: 'Surveying',
    level: 'Master',
    semesters: ['1','2']
  },
  {
    course_id: 'CVLENGBACH',
    title: 'Civil Engineering',
    level: 'Bachelor',
    semesters: ['1','2']
  },
  {
    course_id: 'BUDTBACH',
    title: 'Building Technology',
    level: 'Master',
    semesters: ['1','2']
  }
]

export default class SavedCourses extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    
    course_id = this.props.navigation.state.params.current_id,
    semester = this.props.navigation.state.params.semester,

    this.state = {

      selected: course_id,
      selected_semester: semester,

      segment: 'Saved',

      listOfSavedCourses: saved_courses.courses,
      all_courses: all_courses,

      searchInput: ""

    }
  }

  updateList = (course) => {
    this.setState({ selected: course.course_id })
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listOfSavedCourses];
    newData.splice(rowId, 1);
    this.setState({ listOfSavedCourses: newData });
  }

  changeScheduleSelection = (course) => {
    let value = course.course_id;
    let semester = course.semester;

    if(value == this.state.selected) {
      value = ''
    };

    this.setState ({selected : value, selected_semester: semester })
  }

  sortArray = (array, key) => {
    return array.sort(function(a, b){
            if(a[key] < b[key]) return -1;
            if(a[key] > b[key]) return 1;
            return 0;
          })
  }

  renderFavoriteCourses = () => {

    return (
      <List
        dataSource={this.ds.cloneWithRows(this.sortArray(this.state.listOfSavedCourses, 'title'))}
        renderRow={course =>
          <ListItem
            onPress={()=> this.changeScheduleSelection(course) } 
            >
            <Body>
              <Text style={{fontWeight:'bold'}}>{course.title} {course.level}</Text>
              <Text note>{course.semester} semester</Text>
            </Body>
            <Right>
              <CheckBox 
                checked={course.course_id === this.state.selected && course.semester === this.state.selected_semester ? true : false} onPress ={()=> this.changeScheduleSelection(course) }/>
            </Right>
          </ListItem>}
          renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
              <Icon active name="trash" style={{fontSize: 24,}} />
            </Button>}
        leftOpenValue={75}
      />
    )

  }

  renderAllCourses = () => {
    return (
      <View>
        <SearchBar
        round
        showloading
        lightTheme
        containerStyle={{backgroundColor: 'white', borderColor: 'white', borderWidth: 0,}}
        icon={{ type: 'font-awesome', name: 'search' }}
        onChangeText={ (text) => this.setState({ searchInput: text}) } // FIlter the list
        onCancel={(text) => this.filterSearch("")} // Restore the list
        placeholder='Search...' />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.all_courses.filter(item => item.title.toUpperCase().includes(this.state.searchInput.toUpperCase()))}
          extraData={this.state.all_courses}
          renderItem = {({item}) =>
          <ListItem
            style={{borderBottomWidth: 1}}
            onPress={() =>
              ActionSheet.show(
                {
                  options: item.semesters,
                  title: "Select semester for " + item.title + " ..."
                },
                buttonIndex => {
                  this.pushNewCourse(item, buttonIndex);
                }
              )}
            >
            <Body>
                <Text style={{fontWeight: 'bold'}}>{item.title} {item.level}</Text>
            </Body>
            <Right>
                <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>
          }
        />
       </View>
    )
  }

  /**
   * Push new course from the Action Sheet
   * @param course The course from the list item
   * @param buttonIndex The index of the action sheet pressed, this is the semester index
   */
  pushNewCourse = (selectedCourse, buttonIndex) => {

    var course = JSON.parse(JSON.stringify(selectedCourse))
    
    // Boolean to push to the list or not
    var push = true;

    // Get the selected semester from the button index
    var semester = course.semesters[buttonIndex];

    if(semester){
    
      // Check if the course is in the list
      for(var item of this.state.listOfSavedCourses){
        if(item.course_id.toString() === course.course_id.toString() && item.semester.toString() === semester.toString() ){
          push = false;
          alert('Already in saved list')
          break;
        };
      }

      // Update the saved course list
      if(push){

        // Put the semester into the course object
        course.semester = semester;

        this.state.listOfSavedCourses.push(course);
        
        // Update the schedule selection
        
        this.state.selected = course.course_id;
        this.state.selected_semester = course.semester;

      }
      
      // Switch the segment to the Saved segment and refesh the view
      this.setState({segment: 'Saved'})
    }
  }

  render() {
    return (
      <Container style={Styles.ContainerStyle}>
        <Header hasTabs hasSegment style={Styles.HeaderStyle}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Lectures", {data:{current_id:this.state.selected}})}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Lectures</Title>
          </Body>
          <Right />
        </Header>
        <Segment style={{ backgroundColor: Theme.primaryColor }}>
          <Button
            first
            active={this.state.segment == 'Saved'}
            onPress={() => this.setState({ segment: 'Saved' })}>
            <Text>Saved</Text>
          </Button>
          <Button
            last
            active={this.state.segment == 'all'}
            onPress={() => this.setState({ segment: 'all' })}>
            <Text>All Courses</Text>
          </Button>
        </Segment>

        <Content padder style={{ backgroundColor: 'white' }}>

          {this.state.segment === 'Saved' ?
            this.renderFavoriteCourses() :
            this.renderAllCourses()
          }

        </Content>
      </Container>
    );
  }
}