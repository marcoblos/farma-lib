import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'

import { NavBar, FaPedidoList, BoxView, ViewContainer } from 'farma-lib'

export class PedidoListPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='Info' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>
          <FaPedidoList title='Titulo do produto' notifications={0} status={1} product='nome do produto' onPress={() => console.log('clicou')} />
          <FaPedidoList title='teste' notifications={1} status={2} product='nome do produto' onPress={() => console.log('clicou')} />
          <FaPedidoList title='teste' notifications={0} status={3} product='nome do produto' onPress={() => console.log('clicou')} />
          <FaPedidoList title='teste' notifications={0} status={4} product='nome do produto' onPress={() => console.log('clicou')} />
          <FaPedidoList title='teste' notifications={0} status={5} product='nome do produto' onPress={() => console.log('clicou')} />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
