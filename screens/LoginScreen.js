import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';
import Animated,{Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Svg,{Image, Circle, ClipPath} from 'react-native-svg';



const {width, height} = Dimensions.get('window');
const {Value, animated, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat} = Animated;
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

    this._onCloseState = Animated.event([
      {
        nativeEvent: ({state}) => block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
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
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
        <Animated.View style={{...StyleSheet.absoluteFill, transform: [{translateY: this.bgY}]}}>
          <Svg height={height+50} width={width}>
            <ClipPath id="clip">
              <Circle r={height+50} cx={width / 2}/>
            </ClipPath>
            <Image
                href={require('../assets/12.jpg')}
                width={width}
                height={height+50}
                preserveAspectRatio = 'xMidYMid slice'
                clipPath='url(#clip)'
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3}}>
          <TapGestureHandler onHandlerStateChange={this._onStateChange}>
            <Animated.View style={{...styles.button, marginTop: height / 8, opacity: this.buttonOpacity, transform: [{translateY: this.buttonY}]}}>
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
          <Animated.View style={{zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform:[{translateY: this.textInputY}], height:height/3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'}}>
            <TapGestureHandler onHandlerStateChange={this._onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{fontSize: 15, transform: [{rotate: concat(this.rotateCross, 'deg')}]}}>X</Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
            placeholder="EMAIL"
            style={styles.textInput}
            placeholderTextColor="black"/>
            <TextInput
                placeholder="PASSWORD"
                style={styles.textInput}
                placeholderTextColor="black"/>

            <Animated.View style={styles.button}>
              <Text style={{fontSize:20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </Animated.View>
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
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.8,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});
