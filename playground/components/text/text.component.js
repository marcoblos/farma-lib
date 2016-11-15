import React, { Component } from 'react'
import { Text } from 'react-native'

export class TextElement extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text {...this.props} />
    )
  }
}
