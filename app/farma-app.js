import React, { Component } from 'react'
import { View, Text } from 'react-native'

import * as axios from 'axios'

import { ConfigTheme } from 'fa-config'

import { StorageService } from 'fa-services'

import { AppNavigator, FaLoader, FaToaster } from 'fa-components'

console.disableYellowBox = true

export class Farma extends Component {
  constructor(props) {
    super(props)
    ConfigTheme.build()

        // this.initialRoute = 'LoginPage'
        // this.initialRoute = 'PocPage'
        // this.initialRoute = 'cotacoes-empty'
    this.initialRoute = 'DashboardPage'
  }

  componentDidMount() {
    StorageService.getString('Usertoken')
        .then((Usertoken) => {
          if (Usertoken) {
            axios.defaults.headers.common.Usertoken = Usertoken.toString()
          }
        })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FaLoader />
        <FaToaster />
        <AppNavigator
          initialRoute={{ name: this.initialRoute }}
        />
      </View>
        )
  }
}
