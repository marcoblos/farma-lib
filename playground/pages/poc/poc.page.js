import React, { Component } from 'react'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import { FaHeader, FaSelectModal } from 'farma-lib'


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
      modalSelectVisible: false
    }
  }


  _onCancelQuantidade() {
    this.setState({modalSelectVisible: false})
  }

  _onSelectQuantidade(value) {
    alert('Valor selecionado: ' + value)
    this.setState({modalSelectVisible: false})
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>FOI!</Text>


        <TouchableHighlight onPress={() => this.setState({modalSelectVisible: true})}>
          <Text>Abrir modal</Text>
        </TouchableHighlight>

        <FaSelectModal label='Quantidade' onCancel={() => this._onCancelQuantidade()} onSelect={(value) => this._onSelectQuantidade(value)} visible={this.state.modalSelectVisible} options={valores} />

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
