import React, { Component } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer, ActionButton } from 'farma-lib'

export class ActionButtonPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quantidade: '10 litros...',
    }
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='ActionButton' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>

          <ActionButton label='Quantidade' style={{marginBottom: 10}} value={this.state.quantidade} icon='person' />
          <ActionButton label='Quantidade' style={{marginBottom: 10}} value={this.state.quantidade} />
          <ActionButton value='Nome do botão...' />

        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
