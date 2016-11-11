import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import {
  FaHeader,
  ViewContainer,
} from 'fa-components'

export class DashboardPage extends Component {
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
        <FaHeader title="Dashboard" onGoBack={() => this._backToHome()} />

        <Text>DASHBOARD</Text>

        <TouchableOpacity onPress={() => this._navigateToPersonShow()}>
          <Text>Ir para POC</Text>
        </TouchableOpacity>

      </ViewContainer>
  ) }
}
