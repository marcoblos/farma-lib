import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';




import { RNS3 } from 'react-native-aws3';

export class PocPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }


  abrir() {
    this.setState({visible: true});
  }


  getPhoto(photo) {
    debugger;
    console.log(photo);
  }

  onClose() {
    this.setState({visible: false});
  }


  render() {
    return (
      <View style={styles.container}>

        <Text style={{margin: 20}} onPress={() => this.abrir()}>Abrir campera</Text>

        <FaCamera visible={this.state.visible} onClose={() => this.onClose()} />
      </View>
    );
  }


  uploadePhoto(path) {
    let self = this;
    const options = {
      bucket: 'farma-images',
      accessKey: 'AKIAJZXIXLFJVNT6GDTQ',
      secretKey: '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',
      region: 'sa-east-1',
      successActionStatus: 201
    };

    this.setState({showProgressBar: true});

    debugger;

    const file = {
      uri: path,
      name: '_nome.jpg',
      type: 'image/jpeg'
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3', response);
      }
      setTimeout( function(){
        self.setState({showProgressBar: false});
      }, 1000);

    }).progress((e) => this._progressBarStatus(e));
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.uploadePhoto(data.path);
      })
      .catch(err => console.error(err));
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
});
