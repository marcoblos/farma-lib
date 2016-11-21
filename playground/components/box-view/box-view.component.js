import React, { Component } from 'react'
import { View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'

export class BoxView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[
        boxView.box,
        this.props.padding === 'sm' ? boxView.sm : {},
        this.props.padding === 'md' ? boxView.md : {},
        this.props.padding === 'lg' ? boxView.lg : {},

        this.props.margin === 'sm' ? boxView.marginSm : {},
        this.props.margin === 'md' ? boxView.marginMd : {},
        this.props.margin === 'lg' ? boxView.marginLg : {},

        this.props.border ? boxView.border : {},
        this.props.style,
      ]}>
        {this.props.children}
      </View>
    )
  }
}

const boxView = EStyleSheet.create({
  box: {
    color: '$colors.scale4',
  },
  marginSm: {
    margin: '$sm',
  },
  marginMd: {
    margin: '$md',
  },
  marginLg: {
    margin: '$lg',
  },
  sm: {
    padding: '$sm',
  },
  md: {
    padding: '$md',
  },
  lg: {
    padding: '$lg',
  },
  border: {
    borderWidth: 1,
    borderColor: '$colors.gray4',
  },
})
