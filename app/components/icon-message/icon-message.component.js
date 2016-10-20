import React,
{ Component } from 'react'
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import EStyleSheet from 'react-native-extended-stylesheet'

export class FaIconMessage extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    let _type = this.props.type || '_'
    let _size = this.props.size || '_'

    return (
      <View style={[message.container, customStyle[_type].container]}>
        <Icon name={this.props.icon} style={[message.icon, customStyle[_type].icon]} />
        <View style={message.textWrapper}>
          <Text style={[message.text, customStyle[_type].text]}>{this.props.message}</Text>
        </View>
      </View>
    )
  }
}

import { ALERT, INFO, DANGER, SUCCESS } from './_themes'

const _alertStyle = EStyleSheet.create(ALERT)
const _infoStyle = EStyleSheet.create(INFO)
const _dangerStyle = EStyleSheet.create(DANGER)
const _successStyle = EStyleSheet.create(SUCCESS)

const customStyle = {
    '_': {},
    'alert': _alertStyle,
    'info': _infoStyle,
    'danger': _dangerStyle,
    'success': _successStyle
}


const message = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: '#f98e2e'
  },
  icon: {
    fontSize: 45,
    color: 'rgba(255,255,255,0.7)'
  },
  textWrapper: {
    flex: 1,
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20
  },
  text: {
    color: '$colors.white1'
  }
})
