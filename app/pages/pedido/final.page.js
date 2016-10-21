import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Switch, TextInput, ScrollView, Modal, Dimensions } from 'react-native'
import { ViewContainer, FaHeader, FaRadioList, FaButton, FaFullButton, FaPageTitle, FaMessage } from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'
import Picker from 'react-native-picker'

import Icon from 'react-native-vector-icons/MaterialIcons'

const {height, width} = Dimensions.get('window')
const pedidoData = require('./_pedidoData.json')
const s = require('../../styles/core.js')

export class FinalPage extends Component {
  constructor(props) {
    super(props)

  }

  _continuar() {
    this.props.navigator.resetTo({
      name: "DashboardPage"
    })
  }

render() {
  return (
    <ViewContainer>
      <FaHeader title='Pedido concluído!' hideBackButton={true} />

      <FaMessage title={`Pedido concluído!`} text={`Seu pedido Nº ${this.props.idPedido} foi registrado, logo você receberá ofertas das farmácias.`} icon='check-circle' />

      <View style={s.padding}>
        <FaButton label='VOLTAR PARA O INÍCIO' size='lg' type='primary' onPress={() => this._continuar()} />
      </View>

    </ViewContainer>
  )}
}
