import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer, IconMessage } from 'farma-lib'

export class IconMessagePage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='IconMessage' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>
          <IconMessage type="info" icon="restore" message="Aguardando a farmácia processar o pedido." />
        </BoxView>

        <BoxView padding='sm'>
          <IconMessage type="danger" icon="restore" message="Aguardando a farmácia processar o pedido." />
        </BoxView>

        <BoxView padding='sm'>
          <IconMessage type="success" icon="restore" message="Aguardando a farmácia processar o pedido." />
        </BoxView>

        <BoxView padding='sm'>
          <IconMessage type="alert" icon="restore" message="Aguardando a farmácia processar o pedido." />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
