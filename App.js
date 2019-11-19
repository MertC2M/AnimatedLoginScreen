/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Developed by Mert Tuncer on 11/13/2019
 * e-mail: mert.tuncer0@gmail.com
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreenOfApplication from './screens/SplashScreenOfApplication';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'SplashScreen',
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  renderPage() {
    switch (this.state.currentPage) {
      case 'SplashScreen':
        return <SplashScreenOfApplication />;
      case 'LoginScreen':
        return <LoginScreen />;
    }
  }

  test = setTimeout(() => {
    this.setState({currentPage: 'LoginScreen'});
  }, 450);

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>{this.renderPage()}</View>
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
