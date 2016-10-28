import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaProduct extends Component {
  constructor(props) {
    super(props)
  }

  _renderIcon(icon) {
    let iconName = 'chevron-right'
    if (icon)
      { iconName = icon }

    return (
      <Icon name={iconName} size={this.props.iconSize || 20} style={product.icon} />
    )
  }

  _renderNotification(num) {
    if (num) {
      return (
        <View style={product.num}>
          <Text style={product.numText}>{num}</Text>
        </View>
      )
    }

    return false
  }

  _renderTitle() {
    if (this.props.title) {
      return (
        <Text style={product.buttonTitle}>{this.props.title}</Text>
      )
    }
  }

  _renderTextRow(text) {
    return (
      <Text style={product.buttonLabel}>{text}</Text>
    )
  }

  _renderLabel() {
    if (this.props.label && typeof this.props.label !== 'object') {
      return (
        <Text style={product.buttonLabel}>{this.props.label}</Text>
      )
    } else if (typeof this.props.label === 'object') {
      return (
        <View style={product.buttonLabel}>
          {this.props.label.map((text) => this._renderTextRow(text))}
        </View>
      )
    }
  }

  _renderText() {
    if (this.props.text) {
      return (
        <Text style={product.buttonText}>{this.props.text}</Text>
      )
    }
  }

  _renderStatus(s) {
    let label = ''
    let icon = ''

    if (s === 1) {
      label = 'Aguardando resposta da farmácia'
      icon = 'access-time'
    }

    if (s === 2) {
      label = 'Pedido cotado'
      icon = 'exit-to-app'
    }

    if (s === 3) {
      label = 'Aguardando a entrega'
      icon = 'hourglass-empty'
    }

    if (s === 4) {
      label = 'Saiu para entrega'
      icon = 'motorcycle'
    }

    if (s === 5) {
      label = 'Pedido finalizado'
      icon = 'check'
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} style={product.buttonTextIcon} />
        <Text style={product.buttonText}>{label}</Text>
      </View>
    )
  }

  _renderNum() {
    if (this.props.notifications > 0) {
      return (
        <View style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
          <View style={product.num}>
            <Text style={product.numText}>{this.props.notifications}</Text>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={this.props.activeOpacity || 0.5} onPress={() => this.props.onPress()}>
        <View style={product.button}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={product.buttonTitle}>{this.props.title}</Text>
              <Text style={product.buttonLabel}>{this.props.product}</Text>
              {this._renderStatus(this.props.status)}
            </View>
            {this._renderNum()}
          </View>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="chevron-right" size={20} style={product.icon} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const product = EStyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '$colors.color1',
  },
  buttonLabel: {
    fontSize: 14,
    paddingTop: 3,
    color: '$colors.color2',
    flex: 1,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 13,
    marginRight: 20,
    color: 'rgba(0,0,0,0.4)',
    color: '$colors.color3',
    marginTop: 6,
  },
  buttonTextIcon: {
    fontSize: 18,
    marginTop: 5,
    marginRight: 5,
    color: '$colors.color3',
  },
  num: {
    backgroundColor: '$colors.danger',
    height: 22,
    width: 22,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  numText: {
    color: '$colors.white1',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
  },
})
