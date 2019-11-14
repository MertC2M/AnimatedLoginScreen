import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Animated,{Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';



const {width, height} = Dimensions.get('window');
const {Value, animated, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate} = Animated;
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);
    this._onStateChange = Animated.event([
      {
        nativeEvent: ({state}) => block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
        ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [300, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
        <Animated.View style={{...StyleSheet.absoluteFill, transform: [{translateY: this.bgY}]}}>
          <Image
            source={require('../assets/bg.jpg')}
            style={{flex: 1, height: null, width: null}}
          />
        </Animated.View>
        <View style={{height: height / 3}}>
          <TapGestureHandler onHandlerStateChange={this._onStateChange}>
            <Animated.View style={{...styles.button, opacity: this.buttonOpacity, transform: [{translateY: this.buttonY}]}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this._onStateChange}>
            <Animated.View style={{...styles.button, backgroundColor: '#2E71DC', opacity: this.buttonOpacity, transform:[{translateY: this.buttonY}]}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                SIGN IN WITH Connected2.me
              </Text>
            </Animated.View>
          </TapGestureHandler>
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
