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

import { NavBar, FaSelectModal, FaButton, Input } from 'farma-lib'


const valores = [
  {
    'label': '10 minutos',
    'value': '10min',
  },
  {
    'label': '20 minutos',
    'value': '20min',
  },
  {
    'label': '30 minutos',
    'value': '30min',
  },
  {
    'label': '40 minutos',
    'value': '40min',
  },
  {
    'label': '50 minutos',
    'value': '50min',
  },
  {
    'label': '1 hora e 10 minutos',
    'value': '1h 10min',
  },
  {
    'label': '1 hora e 20 minutos',
    'value': '1h 20min',
  },
  {
    'label': '1 hora e 30 minutos',
    'value': '1h 30min',
  },
]

export class PocPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalSelectVisible: false,
      valorSelecionado: 'Selecione...'
    }
  }


  _onCancelQuantidade() {
    this.setState({modalSelectVisible: false})
  }

  _onSelectQuantidade(value) {
    this.setState({valorSelecionado: value, modalSelectVisible: false})
  }


  render() {
    return (
      <View style={styles.container}>

        <NavBar title='Teste!!' />

        <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={true}>

        <FaButton
          label="Selecionar"
          type="primary"
          style={{marginBottom: 10}}
          onPress={() => this.setState({modalSelectVisible: true})}
        />

      <Text>Valor selecionado: {this.state.valorSelecionado}</Text>

        <FaSelectModal
          label='Quantidade'
          visible={this.state.modalSelectVisible}
          onCancel={() => this._onCancelQuantidade()}
          onSelect={(value) => this._onSelectQuantidade(value)}
          options={valores}
        />


      <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>

    <TextInput returnKeyType='next' style={{height: 30, borderWidth: 1}} />

      <Text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>

    <Input label="campo 1" ref="email1" value='' required showErrors={this.state.showErrors} />
    <Input label="campo 2" ref="email2" value='' required showErrors={this.state.showErrors} />

      <TextInput style={{height: 30, borderWidth: 1}} />

        <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      </ScrollView>
      </KeyboardAvoidingView>

      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
