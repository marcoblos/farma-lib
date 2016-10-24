import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Camera from 'react-native-camera';

export class FaCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: ''
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.props.getPhoto(data.path);
        this.props.onClose();
      })
      .catch(err => console.error(err));
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
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureQuality={Camera.constants.CaptureQuality.high}
          captureAudio={false}
          aspect={Camera.constants.Aspect.fill}>


          <View style={{backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, flex: 1, flexDirection: 'row'}}>

            <View style={{flex: 1, alignItems: 'center'}}></View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={{backgroundColor: 'transparent'}}>
                <Icon name='photo-camera' size={60} style={{color: 'white'}} />
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20}}>
              <TouchableOpacity onPress={() => this.props.onClose()} style={{backgroundColor: 'transparent'}}>
                <Icon name='close' size={30} style={{color: 'white'}} />
              </TouchableOpacity>
            </View>

          </View>

        </Camera>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
});
