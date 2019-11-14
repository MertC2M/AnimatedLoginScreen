import React from 'react';
import {Image, StatusBar, StyleSheet, View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class SplashScreenOfApplication extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    //SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode={'center'}
          source={require('../assets/splash.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
