import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import EStyleSheet from 'react-native-extended-stylesheet'

export class FaModalHeader extends Component {
  constructor(props) {
    super(props)
  }

  _renderBackButton() {
    if (this.props.hideBackButton) {
      return null
    }

    return (
      <TouchableOpacity onPress={() => this._onGoBack()} style={header.backButton}>
        <View>
          <Icon name="keyboard-arrow-left" style={header.backButtonIcon} />
        </View>
      </TouchableOpacity>
        )
  }

  _renderRight() {
    return (
      <TouchableOpacity onPress={() => this._onGoBack()} style={[header.backButton, { justifyContent: 'flex-end' }]}>
        <View>
          <Icon name="close" style={[header.backButtonIcon, { fontSize: 26 }]} />
        </View>
      </TouchableOpacity>
    )
  }

  _onGoBack() {
    this.props.onClose()
  }

  _renderLogo() {
    return (
      <View style={logo.container}>
        <View style={{ width: 160, height: 40 }}><Image style={logo.farma} source={require('../../assets/img/farma-express-logo-white.png')} /></View>
      </View>
    )
  }

  _renderTitle() {
    return (
      <Text style={header.title}>{this.props.title}</Text>
    )
  }

  render() {
    return (
      <View style={[header.container, this.props.style]}>

        <StatusBar barStyle="light-content" />

        <View style={header.left}>
          {this._renderBackButton()}
        </View>

        {this.props.showLogo ? this._renderLogo() : this._renderTitle()}

        <View style={header.right}>
          {this._renderRight()}
        </View>
      </View>
      )
  }

}


const logo = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  farma: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null,
  },
})

const header = EStyleSheet.create({
  container: {
    height: 70,
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    width: 80,
  },
  backButton: {
    width: 60,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonIcon: {
    fontSize: 32,
    color: '$colors.white1',
  },
  title: {
    flex: 3,
    color: '$colors.white1',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right: {
    width: 80,
  },
  text: {
    color: 'white',
  },
})