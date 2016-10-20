import React, { Component } from 'react'
import { Text, View, TouchableHighlight, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { ViewContainer, FaHeader, StatusBarBackground } from 'fa-components'

export class RootPage extends Component {
    constructor(props) {
        super(props)
    }

    _navigateToPersonShow() {
    this.props.navigator.push({
      name: "PedidoBuscar",
      data: 'dataTeste'
    })
  }

    _backToHome() {
        this.props.navigator.pop()
    }

    render() {
        return (
            <ViewContainer style={mainStyle.teste}>

                <StatusBarBackground />

                <FaHeader title='aaaaa' onGoBack={() => this._backToHome()} />

                <Text>MAIN</Text>
                <TouchableOpacity onPress={() => this._navigateToPersonShow() }>
                  <Text>Ir para POC</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigator.pop() }>
                  <Text>Fechar</Text>
                </TouchableOpacity>
            </ViewContainer>
        )
    }
}

const mainStyle = StyleSheet.create({

  teste: {
    backgroundColor: '#999999'
  }

})
