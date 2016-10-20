import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Modal
} from 'react-native'

import Camera from 'react-native-camera'

export class FaCamera extends Component {
  constructor(props) {
    super(props)

  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.props.getPhoto(data.path)
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible || false}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureQuality={Camera.constants.CaptureQuality.medium}
          captureAudio={false}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text style={styles.capture} onPress={() => this.props.onClose()}>cancelar</Text>
        </Camera>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
