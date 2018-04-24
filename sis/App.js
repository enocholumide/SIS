import Expo from 'expo';
import {Container, StyleProvider, Content} from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getTheme from './native-base-theme/components';
import HomeScreen from './src/components/screens/HomeScreen/index.js'

export default class App extends React.Component {

  constructor() {
  super();
  this.state = {
    isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
