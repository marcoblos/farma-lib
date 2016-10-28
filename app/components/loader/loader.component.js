import React, { Component } from 'react'
import { View, Animated, InteractionManager, Dimensions, Modal, ActivityIndicator } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { LoaderService } from 'fa-services'

global.__szLoaderStateTimer = null
const WAINTING_TIME_BETWEEN_STATES = 300

let { width, height } = Dimensions.get('window')

export class FaLoader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      opacity: new Animated.Value(0),
      height: new Animated.Value(0),
    }

    LoaderService.addListener((state) => this._onRequest(state))
  }

  _onRequest(state) {
    const self = this
    clearTimeout(global.__szLoaderStateTimer)

    global.__szLoaderStateTimer = setTimeout(() => {
      self.setState({
        visible: state,
      })

      if (state) {
        Animated.sequence([
          Animated.timing(
                 self.state.height,
                 { toValue: height, duration: 0 }
               ),
          Animated.timing(
                 self.state.opacity,
                 { toValue: 1 }
               ),
        ]).start()
      } else {
        Animated.sequence([
          Animated.timing(
                self.state.opacity,
                { toValue: 0, duration: 300 }
              ),
          Animated.timing(
               self.state.height,
               { toValue: 0, duration: 0 }
             ),
        ]).start()
      }
    }, WAINTING_TIME_BETWEEN_STATES)
  }

  render() {
    return (
      <Animated.View style={[style.container, { opacity: this.state.opacity, height: this.state.height }]}>
        <ActivityIndicator
          animating={this.state.loaderVisible}
          size={this.props.size || 'large'}
          color="black"
          style={this.props.customStyle || {}}
        />
      </Animated.View>
        )
  }
}

const style = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    zIndex: 101,
  },
})
