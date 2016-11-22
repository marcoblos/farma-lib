import React, { Component } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import EStyleSheet from 'react-native-extended-stylesheet'

export class ActionButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 'Selecione...',
    }
  }

  componenteDidMount() {
    this.setState({value: this.props.value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  _onPress() {
    if(this.props.onPress) {
      this.props.onPress()
    }
  }

  _renderLabel () {
    if(this.props.label) {
      return (
        <Text style={aa.label}>{this.props.label}</Text>
      )
    }
  }

  _renderValue () {
    if(this.props.value) {
      return (
        <Text style={aa.value}>{this.props.value}</Text>
      )
    }
  }

  render() {
    return (
      <TouchableOpacity style={[aa.row, this.props.style, this.props.valid === false ? {borderColor: 'red'} : {}, this.props.children ? {} : {height: 60}]} onPress={() => this._onPress()}>
        <View>
          {this._renderLabel()}
          {this._renderValue()}
          {this.props.children}
        </View>
        <View style={aa.icon}>
          <Icon style={[this.props.iconStyle, this.props.valid === false ? {color: 'red'} : {}]} name={this.props.icon || 'touch-app'} size={33} color="#999" />
        </View>
      </TouchableOpacity>
    )
  }
}


const aa = EStyleSheet.create({
  row: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '$colors.scale7',
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.7)',
    paddingBottom: 2,
  },
  value: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.9)',
  },
  valueLarge: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.9)',
  },
  icon: {
    width: 50,
    flexDirection: 'column',
  },
  iconContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
