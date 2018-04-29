import Expo from 'expo';
import { Container, StyleProvider, Content } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import getTheme from './native-base-theme/components';

import Navigator from './src/components/navigation/Navigation.js'
import FakeDataStore from './src/data/fakeDataStore.js'
import config from './config.js'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
      data: undefined
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });


    if (config.mode === 'development') {
      try {

        //await FakeDataStore.storeFakeDataToLocalStorage()
        
        // Use this to override the existing data store

        await FakeDataStore.proceedToStoreAllFakeData();

      } catch (error) {

      }
    }

    /**
    try {
      const mode = await AsyncStorage.getItem('mode');
      if (mode !== null) {
          if(mode === 'development') {

          }
      } else
        console.log('No data');
    } catch (error) {
      // Error retrieving data
      console.log('Error retrieving your data')
    }

     */

  }

  async componentDidMount() {

    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        // We have data!!
        //console.log(userData);
        this.state.data = userData;
      } else
        console.log('No data');
    } catch (error) {
      // Error retrieving data
      console.log('Error retrieving your data')
    }

    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <Navigator />;
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
