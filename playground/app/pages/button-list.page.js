import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'

import { NavBar, ButtonList } from 'farma-lib'

export class ButtonListPage extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View style={styles.container}>

        <NavBar title='ButtonList' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>
        <ButtonList title='Título grande' label='Descição maior sobre o item' />
        <ButtonList title='Outro título' notifications={2} label={['item 1', 'item 2', 'item 3']} />
        <ButtonList title='Teste' label='Opa' text='Complemento' />
        <ButtonList title='Evento 10' label='Pago' text='10/10/2016' />
        <ButtonList title='Fechado' label='Pago' icon='close' />
        <ButtonList title='Fechado' label='Pago' icon='person' iconSize={40} />
        <ButtonList title='Com cores...' label='lindas' icon='person' iconStyle={{color: 'red'}} iconSize={40} />
      </ScrollView>

      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
