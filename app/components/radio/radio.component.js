import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export class FaRadioList extends Component {
  constructor(props) {
    super(props)
  }

  _onSelected(value) {
    this.setState({
      selectedSize: value,
    })
    this.props.onSelected(value)
  }

  render() {
    return (
      <View>
        {this.props.options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this._onSelected(option.value)}
              style={[radio.container, index === (this.props.options.length - 1) ? { borderBottomWidth: 0 } : {}]}
            >
              <View style={radio.icon}>
                <View style={[radio.iconIn, option.value == this.props.selected ? radio.iconInSelected : {}]} />
              </View>
              <Text>{option.value}</Text>
            </TouchableOpacity>
              )
        })}
      </View>
      )
  }

}

const radio = EStyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '$colors.gray1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  icon: {
    width: 26,
    height: 26,
    borderRadius: 26,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '$colors.gray1',
  },
  iconIn: {
    opacity: 0,
    position: 'absolute',
    top: 3,
    bottom: 3,
    right: 3,
    left: 3,
    borderRadius: 26,
    backgroundColor: '$colors.primary',
  },
  iconInSelected: {
    opacity: 1,
  },
})
