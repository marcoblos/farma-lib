import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native'

import { NavBar, FaSelectModal, FaButton, Input, ButtonList } from 'farma-lib'

export class HomePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalSelectVisible: false,
      valorSelecionado: 'Selecione...'
    }
  }

  _goTo(page) {
    this.props.navigator.push({
      name: page
    })
  }


  render() {
    return (
      <View style={styles.container}>

        <NavBar title='Farma lib' />

      <ScrollView>
        <ButtonList onPress={() => this._goTo('ButtonListPage')} title='ButtonList' label='Listas com ícones e notificações.' />
        <ButtonList onPress={() => this._goTo('SelectModalPage')} title='SelectModal' label='Modal para selecionar valores.' />
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
