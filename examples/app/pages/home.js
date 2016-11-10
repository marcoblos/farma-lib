import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


import {
  ViewContainer,
} from 'fa-components'

export class Home extends Component {
  constructor(props) {
    super(props)
  }

  _navigateToPersonShow() {
    this.props.navigator.push({
      name: 'PocPage',
    })
  }

  _backToHome() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <ViewContainer>

        <Text>HOME</Text>

      </ViewContainer>
  ) }
}
