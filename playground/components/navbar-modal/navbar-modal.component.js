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

export class NavBarModal extends Component {
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

        {this._renderTitle()}

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
    height: 65,
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
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonIcon: {
    fontSize: 32,
    color: '$colors.white',
  },
  title: {
    flex: 3,
    color: '$colors.white',
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
