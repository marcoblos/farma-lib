import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class Info extends Component {
  constructor(props) {
    super(props)
  }

  _renderIcon() {
    if (this.props.icon) {
      return (
        <Icon name={this.props.icon} size={20} style={info.icon} />
        )
    }
  }

  render() {
    return (
      <View style={[
        info.container, this.props.style,
        this.props.last ? { marginBottom: 0 } : { marginBottom: 22 },
      ]}
      >
        <Text style={info.label}>{this.props.uppercase ? this.props.label.toUpperCase() : this.props.label}</Text>
        <View style={{ flexDirection: 'row' }}>
          {this._renderIcon()}
          <Text style={[info.value, this.props.valueStyle]}>
            {this.props.value}
          </Text>
        </View>
      </View>
        )
  }
}

const info = EStyleSheet.create({
  container: {
  },
  label: {
    fontSize: 11,
    paddingBottom: 3,
    fontWeight: 'bold',
    color: '$colors.scale4',
  },
  value: {
    fontSize: 14,
    color: '$colors.black',
  },
  icon: {
    fontSize: 17,
    marginRight: 3,
    color: '$colors.scale4',
  },
})
