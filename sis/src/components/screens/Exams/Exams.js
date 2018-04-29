import React from "react";
import { StatusBar, TouchableHighlight, View, Image, AsyncStorage } from "react-native";
import TimeAgo from 'react-native-timeago';
import ModalWrapper from 'react-native-modal-wrapper'
import {
    Button,
    Text,
    Container,
    Body,
    Header, H1, H2, H3,
    Title,
    Left, List,
    Icon,
    Right,
    Spinner
} from "native-base";
import Expo from 'expo'
import { Overlay } from 'react-native-elements'
import { Theme, Styles } from '../../../appStyles.js'
import moment from 'moment';

import Modal from "react-native-modal";

export default class Exams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exams: [],
            modalVisible: false,
            exam: null,
            isReady: false
        }
    }

    componentWillMount() {

        this.setExamsList();

    }

    /** 
     * Gets and sets the list of exams to be displayed.
     * This time from the local storage
    */
    async setExamsList() {
        try {

            const userExams = await AsyncStorage.getItem('exams');

            if (userExams !== null) {

                //console.log(JSON.parse(userExams))

                this.setState({ exams: this.sortExams(JSON.parse(userExams)), isReady: true })

            } else
                console.log('No data');
        } catch (error) {
            // Error retrieving data
            console.log('Error retrieving your data')
        }
    }

    /**
     * Sort exams by date
     * @param exams array list of exams
     * @return array of sorted exams sorted by date
     */
    sortExams = (exams) => {

        // Sort the date

        exams.sort(function (a, b) {
            var dateA = moment(a.date + " " + a.from), dateB = moment(b.date + " " + b.from);
            return dateA - dateB;
        });

        // Return the sorted exams

        return exams;

    }

    /**
     * Show the details of the exam in a modal window
     */
    showExamDetails = () => {

        return (
            <Overlay
                isVisible={this.state.modalVisible}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <Text>Hello from Overlay!</Text>
            </Overlay>
        )

    }

    render() {

        let exams = this.state.exams;

        if (this.state.isReady) {

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
                            <Title>Exams</Title>
                        </Body>
                        <Right />
                    </Header>

                    {exams === undefined || exams === null || exams.length < 1 ?

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

                            <Icon name='pencil-box' type='MaterialCommunityIcons' style={{ fontSize: 80, color: 'gray' }} />
                            <Text>No upcoming exams found!</Text>

                        </View>

                        :

                        this.renderExams()

                    }

                </Container>
            );
        } else {
            return (
                <View style={[Styles.ContentStyle, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Spinner />
                    <Text>Loading exams...</Text>
                </View>

            )
        }
    }

    renderExamDetails = () => {

        if (this.state.exam !== null) {

            let exam = this.state.exam

            return (
                <Modal
                    isVisible={this.state.modalVisible}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={500}
                    backdropTransitionOutTiming={500}
                    onSwipe={() => this.setState({ modalVisible: false })}
                    swipeDirection="down">

                    <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <TouchableHighlight
                            onPress={() => this.setState({ modalVisible: false, exam: null })}
                            style={{ position: 'absolute', top: 0, right: 0, margin: 20 }}>
                            <Icon name='close' type='FontAwesome' style={{ color: '#77acff' }} />
                        </TouchableHighlight>
                        <Icon name='calendar-check-o' type='FontAwesome' style={{ margin: 25, fontSize: 100, color: '#e0e0e0' }} />

                        <H3>{this.state.exam.title}</H3>

                        <Text style={{ fontWeight: 'bold', fontSize: 35, marginVertical: 15 }}>{this.state.exam.from.toUpperCase() + " | " + this.state.exam.to.toUpperCase()}</Text>

                        <Text style={{ marginVertical: 5 }}>{moment(exam.date).format("dddd, MMMM Do YYYY").toString().toUpperCase()}</Text>
                        <Text style={{ color: 'gray' }}>{exam.location.toUpperCase()}</Text>

                        <Text note style={{ marginVertical: 15 }}>{exam.note}</Text>

                        <TouchableHighlight style={{ backgroundColor: '#77acff', padding: 15, borderRadius: 25, marginVertical: 15 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>   REQUEST CANCELLATION   </Text>
                        </TouchableHighlight>

                    </View>
                </Modal>
            )
        }
    }

    renderExams = () => {
        return (
            <View style={Styles.ContentStyle}>


                <List dataArray={this.state.exams}
                    renderRow={(exam, tag, index) =>
                        <View>
                            {
                                index == 0 ?
                                    <Text>{moment(exam.date).format("dddd, MMMM Do YYYY").toString()}</Text> :
                                    exam.date.toString() !== this.state.exams[index - 1].date.toString() ?
                                        <Text style={{ marginTop: 20 }}>{moment(exam.date).format("dddd, MMMM Do YYYY").toString()}</Text> :
                                        null
                            }
                            <TouchableHighlight onPress={() => this.setState({ modalVisible: true, exam: exam })} >
                                <View style={{ marginVertical: 10, backgroundColor: 'white', padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'column', flex: 0.6 }}>
                                        <Text note>{exam.course_id}</Text>
                                        <H3>{exam.title}</H3>
                                        <Text note style={{ color: Theme.primaryColor }}>{exam.location}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 0.4, justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b7b2b2' }}>
                                            <Text style={{ color: 'white' }}>{exam.from}</Text>
                                        </View>
                                        <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#918e8e' }}>
                                            <Text style={{ color: 'white' }} >{exam.to}</Text>
                                        </View>

                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>

                    }>
                </List>

                {this.renderExamDetails()}

            </View>
        )
    }
}

const modalanim = 500;
