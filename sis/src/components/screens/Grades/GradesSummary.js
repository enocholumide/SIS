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

const grades = [
    {
        semester_title: 'Winter semester 08/09',
        semester_id: 'WS08/09',
        courses: [
            {
                course_id: 'GMCM305',
                course_title: 'Location based services',
                score: 40,
                grade: 'D',
                note: 'Satisfactory'
            },
            {
                course_id: 'GMCM306',
                course_title: 'Topology and Databases',
                score: 80,
                grade: 'B',
                note: 'Very Good'
            }
        ]
    },
    {
        semester_title: 'Summer semester 08/09',
        semester_id: 'SOSE08/09',
        courses: [
            {
                course_id: 'GMCM405',
                course_title: 'Advanced Simulation and Data Modelling',
                score: 95,
                grade: 'A',
                note: 'Excellent'
            },
            {
                course_id: 'GMCM506',
                course_title: 'Research Techniques',
                score: 65,
                grade: 'C',
                note: 'Good'
            }
        ]
    }
]

export default class GradesDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

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
                        <Title>Grades</Title>
                    </Body>
                    <Right />
                </Header>


                <View style={{ backgroundColor: 'white', flex: 1 }}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={grades}
                        extraData={grades}
                        renderItem=
                        {({ item }) =>
                            <View>
                                <ListItem itemDivider>
                                    <Text>{item.semester_title}</Text>
                                </ListItem>
                                <List dataArray={item.courses}
                                    renderRow={(course) =>
                                        <ListItem
                                            onPress={() => this.props.navigation.navigate('GradesDetails', {semester: item, course: course})}>
                                            <Body>
                                                <Text>{course.course_title}</Text>
                                            </Body>
                                            <Right>
                                                <Text>{course.grade}</Text>
                                            </Right>
                                        </ListItem>
                                    }>
                                </List>
                            </View>
                        }
                    />
                </View>

            </Container>
        );
    }
}