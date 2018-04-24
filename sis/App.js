import {Container, StyleProvider, Content} from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getTheme from './native-base-theme/components';

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
    return (
      <StyleProvider  style={getTheme()}>
        <View style = {styles.container}>
           <Text>Open up App.js to start working on your app!</Text>
           <Text>Changes you make will automatically reload.</Text>
           <Text>Shake your phone to open the developer menu.</Text>
         </View>
      </StyleProvider>
    );
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
