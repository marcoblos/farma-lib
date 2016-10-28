import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaFullButton extends Component {
  constructor(props) {
    super(props)
  }

  _renderIcon(icon) {
    let iconName = 'chevron-right'
    if (icon)
      { iconName = icon }

    return (
      <Icon name={iconName} size={this.props.iconSize || 20} style={fullButton.icon} />
    )
  }

  _renderNotification(num) {
    if (num) {
      return (
        <View style={fullButton.num}>
          <Text style={fullButton.numText}>{num}</Text>
        </View>
      )
    }

    return false
  }

  _renderTitle() {
    if (this.props.title) {
      return (
        <Text style={fullButton.buttonTitle}>{this.props.title}</Text>
      )
    }
  }

  _renderTextRow(text, index) {
    return (
      <Text key={index} style={fullButton.buttonLabel}>{text}</Text>
    )
  }

  _renderLabel() {
    if (this.props.label && typeof this.props.label !== 'object') {
      return (
        <Text style={fullButton.buttonLabel}>{this.props.label}</Text>
      )
    } else if (typeof this.props.label === 'object') {
      return (
        <View style={fullButton.buttonLabel}>
          {this.props.label.map((text, index) => this._renderTextRow(text, index))}
        </View>
      )
    }
  }

  _renderText() {
    if (this.props.text) {
      return (
        <Text style={fullButton.buttonText}>{this.props.text}</Text>
      )
    }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={this.props.activeOpacity || 0.5} onPress={() => this.props.onPress()}>
        <View style={
          [
            fullButton.button,
            this.props.style,
            this.props.margin ? { marginTop: this.props.margin, marginBottom: this.props.margin } : {},
            this.props.padding ? { paddingTop: this.props.padding, paddingBottom: this.props.padding } : {},
            this.props.border === false ? { borderWidth: 0 } : {},
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              {this._renderTitle()}
              {this._renderLabel()}
            </View>
            {this._renderNotification(this.props.notifications)}
          </View>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {this._renderText()}
              {this._renderIcon(this.props.icon)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const fullButton = EStyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '$colors.white1',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '$colors.gray2',
    marginBottom: -1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonLabel: {
    paddingTop: 3,
  },
  buttonText: {
    fontSize: 12,
    marginRight: 20,
    color: 'rgba(0,0,0,0.4)',
  },
  num: {
    backgroundColor: '$colors.secondary',
    height: 22,
    width: 22,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    position: 'absolute',
    top: -1,
  },
  numText: {
    color: '$colors.white1',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
    marginTop: 4,
  },
})
