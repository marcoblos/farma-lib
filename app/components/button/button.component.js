import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaButton extends Component {
  constructor(props) {
    super(props)
  }

  _bindTypeProperties() {
  }

  _renderIcon(icon) {

    if(icon === undefined) {
      return false
    }

    let _type = this.props.type || '_'

    return (
      <Icon name={icon} size={this.props.iconSize || 20} style={[
            baseStyle.icon,
            customStyle[_type].icon
        ]} />
    )
  }

  render() {
      let _type = this.props.type || '_'
      let _size = this.props.size || '_'
    return (
      <TouchableOpacity activeOpacity={this.props.activeOpacity || 0.5} onPress={ () => this.props.onPress() }>
        <View style={
          [
            baseStyle.button,
            this.props.iconPosition === 'left' ? {flexDirection: 'row-reverse'} : {},
            this.props.radius ? {borderRadius: 5} : {},
            customStyle[_type].button,
            sizeStyle[_size].button,
            this.props.style || {}
          ]}>
          <Text style={
            [
              baseStyle.text,
              customStyle[_type].text,
              sizeStyle[_size].text
            ]}>{this.props.label}</Text>

            {this._renderIcon(this.props.icon)}

        </View>
      </TouchableOpacity>
    )
  }
}

/**
 * THEMES
 */
import { FACEBOOK, PRIMARY, SECONDARY, TERNARY, SIZE_LG, SIZE_SM, SIZE_MD, BLACK, CLEAN, SUCCESS, DANGER, LINK } from './_themes'

const _facebookStyle = EStyleSheet.create(FACEBOOK)
const _primaryStyle = EStyleSheet.create(PRIMARY)
const _secondaryStyle = EStyleSheet.create(SECONDARY)
const _ternaryStyle = EStyleSheet.create(TERNARY)
const _blackStyle = EStyleSheet.create(BLACK)
const _cleanStyle = EStyleSheet.create(CLEAN)
const _successStyle = EStyleSheet.create(SUCCESS)
const _dangerStyle = EStyleSheet.create(DANGER)
const _linkStyle = EStyleSheet.create(LINK)
const _sizeLg = EStyleSheet.create(SIZE_LG)
const _sizeSm = EStyleSheet.create(SIZE_SM)
const _sizeMd = EStyleSheet.create(SIZE_MD)

const _defaultSize = EStyleSheet.create({
    button: {},
    text: {}
})


/**
 * STYLES
 */
const baseStyle = EStyleSheet.create({
    button: {
        height: 48,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 3
    },
    icon: {
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: -0.5
    }
})

const customStyle = {
    '_': {},
    'facebook': _facebookStyle,
    'primary': _primaryStyle,
    'secondary': _secondaryStyle,
    'ternary': _ternaryStyle,
    'black': _blackStyle,
    'clean': _cleanStyle,
    'success': _successStyle,
    'danger': _dangerStyle,
    'link': _linkStyle,
}

const sizeStyle = {
    '_': _defaultSize,
    'lg': _sizeLg,
    'sm': _sizeSm,
    'md': _sizeMd
}
