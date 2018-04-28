import Expo from 'expo';
import { StyleSheet } from 'react-native';

export const Theme = {
  primaryColor: '#E91E63'
};

export const DateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}

export const Styles = StyleSheet.create({
  HeaderStyle : {
    backgroundColor: Theme.primaryColor,
  },
  ContainerStyle : {
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: Theme.primaryColor,
    flex: 1
  },
  ContentStyle : {
    backgroundColor: 'white'
  }
});
