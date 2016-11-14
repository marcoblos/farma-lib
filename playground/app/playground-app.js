import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { AppNavigator } from 'lib-components'

import { ConfigTheme } from 'lib-config'

console.disableYellowBox = true

export class playground extends Component {
  constructor(props) {
    super(props)

      this.initialRoute = 'PocPage'
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          initialRoute={{ name: this.initialRoute }}
        />
      </View>
        )
  }
}
