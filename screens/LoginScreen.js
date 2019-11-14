import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class LoginScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
        <View style={{...StyleSheet.absoluteFill}}>
          <Image
            source={require('../assets/bg.jpg')}
            style={{flex: 1, height: null, width: null}}
          />
        </View>
        <View style={{height: height / 3}}>
          <View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
          </View>
          <View style={{...styles.button, backgroundColor: '#2E71DC'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              SIGN IN WITH Connected2.me
            </Text>
          </View>
        </View>
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
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
