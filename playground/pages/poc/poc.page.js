import React, { Component } from 'react'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { FaHeader, FaSelectModal, FaButton } from 'farma-lib'


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

      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
})
