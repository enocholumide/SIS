import React from "react";
import { Animated, Dimensions, FlatList, StatusBar, View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";
import { Constants } from 'expo';
import { Theme, Styles } from '../../../appStyles.js';

import {
    Button, Body,
    Container, Content,
    Header,
    Icon,
    Left, List, ListItem,
    Right,
    Separator,
    Title,
} from "native-base";

import Expo from 'expo';

const data = { pts: 50, ast: 100 };
const chartPadding = 15

const gradeIndicators = [
    {
        grade: 'A',
        label: 'A 90% - 100%',
        value: Math.floor(Math.random() * (100 - 90 + 1)) + 90
    },
    {
        grade: 'B',
        label: 'B 80% - 89%',
        value: Math.floor(Math.random() * (80 - 89 + 1)) + 80
    },
    {
        grade: 'C',
        label: 'C 70% - 79%',
        value: Math.floor(Math.random() * (70 - 79 + 1)) + 70
    },
    {
        grade: 'D',
        label: 'D 60% - 69%',
        value: Math.floor(Math.random() * (69 - 60 + 1)) + 60
    },
    {
        grade: 'F',
        label: 'F 0% - 59%',
        value: Math.floor(Math.random() * (59 - 0 + 1)) + 0
    }
]

export default class GradesDetails extends React.Component {

    constructor(props) {
        super(props);

        //console.log(props)

        let course = this.props.navigation.state.params.course;
        let semester = this.props.navigation.state.params.semester;

        const widths = this.getWidth(gradeIndicators);
        const index = this.findCurrentIndex(course, semester);

        this.state = {
            currentIndex: index,
            gradeIndicators: widths,
            course: course,
            semester: semester
        }

    }

    /**
     * Finds the current index of the course in the list of the semester courses
     * @param course : a course single course in a semester 
     * @param semesterCourses : semester containing all courses
     * @returns the found index of the course, default is 0 if not found
     */
    findCurrentIndex = (course, semesterCourses) => {

        for (var item of semester.courses) {
            if (item.course_id === course.course_id) {
                return semester.courses.indexOf(item);
            }
        }

        // Return default 0
        return 0
    }

    /**
     * Finds the next course in the semester courses array
     * @param direction : -1 or +1 from the back and forward arrows
     */
    findNextCourse = (direction) => {

        //console.log('Direction is ' + direction)

        // Retrieve all courses
        var allSemesterCourses = this.props.navigation.state.params.semester.courses;

        // Get the current index of the semester courses
        var currentIndex = this.state.currentIndex

        // Add the direction
        var newIndex = currentIndex + direction;

        // Check if it is lower than 0
        if (newIndex < 0)
        // If so, Update the new index to the last item in the semster courses array
        {
            // Update the new index
            newIndex = allSemesterCourses.length - 1;

        }

        // Check if it is higher then the semester course length - 1 
        if (newIndex > allSemesterCourses.length - 1)
        // If so, return the course at the zero index
        {
            // Update the new index
            newIndex = 0;

        }

        this.setState({ course: allSemesterCourses[newIndex], currentIndex: newIndex });

        this.handleAnimation()

    }

    /**
     * TODO: Retrieve course indicators here
     */
    getCourseIndicators = () => {

    }

    /**
     * Compute width of each bar based on their value
     * @param gradeIndicators : the grade indicators to compute individual width
     */
    getWidth = (gradeIndicators) => {

        // Get the device width
        const deviceWidth = Dimensions.get('window').width;

        // Clone the data
        var grades = JSON.parse(JSON.stringify(gradeIndicators))

        // Remove the view padding and allow space for the data number on top
        var maxWidth = deviceWidth - (chartPadding * 2) - 50;

        // Find maximum value the grade indicator, which is going to get the maximum width 
        var maxValue = 1;
        for (var item of grades) {
            if (maxValue < item.value) {
                maxValue = item.value
            }
        }

        // Compute the width of each grade indicator
        for (var item of grades) {

            // The maximum value will get the maximum width with this equation
            var width = (maxWidth * item.value) / maxValue;

            // In order to show the rounded bar, if width=0 at first time, the borderRadius can't be implemented in the View
            if (width < 5) { width = 5 }

            // Add computed the width to the object
            item.width = new Animated.Value(width);

        }

        return grades;

    }

    /**
     * 
     */
    handleAnimation = () => {

        const timing = Animated.timing

        // Animate the bars using the new grade indicators
        // For now, a random value is used
        Animated.parallel(this.state.gradeIndicators.map(item => {
            return timing(item.width, { toValue: Math.floor(Math.random() * (280 - 5 + 1)) + 5 })
        })).start()
        /**
         * Animated won't trigger react life cycle
         * Not sure if using animated and setState in a same time would affect performance, not bad for now
         */
        this.setState({
            currentIndex: this.state.currentIndex
        })

    }

    render() {

        let course = this.state.course;
        let semester = this.props.navigation.state.params.semester

        return (
            <Container style={Styles.ContainerStyle}>
                <Header hasTabs style={Styles.HeaderStyle}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Grades</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={styles.container}>

                    <ListItem >

                        <View style={{ backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center', flex: 1, flexDirection: 'row' }}>

                            <Button
                                transparent
                                onPress={() => this.findNextCourse(-1)} >
                                <Icon name="ios-arrow-back" />
                            </Button>

                            <Text> {course.course_title.length > 25 ? course.course_title.substring(0, 25) + '.' : course.course_title }</Text>

                            <Button
                                transparent
                                onPress={() => this.findNextCourse(+1)} >
                                <Icon name="ios-arrow-forward" />
                            </Button>

                        </View>

                    </ListItem>

                    <ListItem >
                        <Text>Course: {course.course_title + " (" + course.course_id + ')'}</Text>
                    </ListItem>

                    <ListItem >
                        <Text>Score: {course.score}</Text>
                    </ListItem>

                    <ListItem >
                        <Text>Grade: {course.grade} ( {course.note} )</Text>
                    </ListItem>

                    <ListItem >
                        <Text>Semester: {semester.semester_title}</Text>
                    </ListItem>

                    <ListItem itemDivider>
                        <Text>Grades summary</Text>
                    </ListItem>

                    <View style={{ marginVertical: 15 }}>

                        {this.state.gradeIndicators.map((grade) => (

                            <View style={styles.item}
                                key={grade.grade}>
                                <Text style={styles.label}>{grade.label} {grade.grade === course.grade ? '(including your performance)' : ''}</Text>
                                <View style={styles.data}>
                                    {
                                        <Animated.View style={[styles.bar, styles.points, { width: grade.width, backgroundColor: grade.grade === course.grade ? 'blue' : 'red' }]} />
                                    }
                                    <Text style={styles.dataNumber}>{grade.value}</Text>
                                </View>
                            </View>

                        ))}

                    </View>
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 6,
        backgroundColor: 'white',
        padding: chartPadding,
    },
    // Item
    item: {
        flexDirection: 'column',
        marginBottom: 5,
        paddingHorizontal: 10
    },
    label: {
        //color: '#CBCBCB',
        flex: 1,
        fontSize: 12,
        position: 'relative',
        top: 2
    },
    data: {
        flex: 2,
        flexDirection: 'row'
    },
    dataNumber: {
        color: '#CBCBCB',
        fontSize: 11
    },
    // Bar
    bar: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 8,
        marginRight: 5
    },
    points: {
        backgroundColor: '#F55443'
    },
    assists: {
        backgroundColor: '#FCBD24'
    },
    rebounds: {
        backgroundColor: '#59838B'
    },
    steals: {
        backgroundColor: '#4D98E4'
    },
    blocks: {
        backgroundColor: '#418E50'
    },
    turnovers: {
        backgroundColor: '#7B7FEC'
    },
    minutes: {
        backgroundColor: '#3ABAA4'
    },
    // controller
    controller: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    button: {
        flex: 1,
        position: 'relative',
        top: -1
    },
    chevronLeft: {
        alignSelf: 'flex-end',
        height: 28,
        marginRight: 10,
        width: 28
    },
    chevronRight: {
        alignSelf: 'flex-start',
        height: 28,
        marginLeft: 10,
        width: 28
    },
    date: {
        color: '#6B7C96',
        flex: 1,
        fontSize: 22,
        fontWeight: '300',
        height: 28,
        textAlign: 'center'
    }

})