import React, {
  Component,
} from 'react'

import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import {
  StatusBarBackground,
} from 'fa-components'

import {
  NavBar,
  ViewContainer,
} from 'fa-components'


const mainStyle = StyleSheet.create({
  teste: {
    backgroundColor: '#999999',
  },

})

export class RootPage extends Component {
  navigateToPersonShow() {
    this.props.navigator.push({
      name: 'PedidoBuscar',
      data: 'dataTeste',
    })
  }

  backToHome() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <ViewContainer style={mainStyle.teste}>

        <StatusBarBackground />

        <NavBar title="aaaaa" onGoBack={() => this.backToHome()} />

        <Text>MAIN</Text>
        <TouchableOpacity onPress={() => this.navigateToPersonShow()}>
          <Text>Ir para POC</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
          <Text>Fechar</Text>
        </TouchableOpacity>
      </ViewContainer>
        )
  }
}