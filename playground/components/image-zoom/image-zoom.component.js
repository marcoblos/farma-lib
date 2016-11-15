import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import EStyleSheet from 'react-native-extended-stylesheet'

import ImageZoom from 'react-native-transformable-image'


const { height, width } = Dimensions.get('window')

export class FaImageZoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      url: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ image: nextProps.image, url: nextProps.url })
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.visible}
      >
        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>


          <ImageZoom
            style={{ width, height, backgroundColor: 'rgba(0,0,0,0.7)' }}
            source={this.state.image ? this.state.image : { uri: this.state.url }}
          />

          <TouchableOpacity style={{ position: 'absolute', top: 40, right: 18, zIndex: 10 }} onPress={() => this.props.onClose()}>
            <Icon name="close" size={35} style={{ color: 'white' }} />
          </TouchableOpacity>

        </View>

      </Modal>
    )
  }

}
