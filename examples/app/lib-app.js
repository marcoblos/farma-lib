import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { AppNavigator } from 'fa-components'

console.disableYellowBox = true

export class lib extends Component {
  constructor(props) {
    super(props)

    this.initialRoute = 'home-page'
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
