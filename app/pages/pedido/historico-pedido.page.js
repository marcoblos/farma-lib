import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Switch, TextInput, ScrollView, Modal, Dimensions } from 'react-native'
import { ViewContainer, FaHeader, FaRadioList, FaButton, FaFullButton, FaPageTitle, FaMessage } from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'
import Picker from 'react-native-picker'

const {height, width} = Dimensions.get('window')
const pedidoData = require('./_pedidoData.json')
const s = require('../../styles/core.js')

export class FinalPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pedidos: {},
    }
  }

  componentDidMount() {
    if(this.props.pedidos) {
      this.setState({pedidos: this.props.pedidos})
    }

    if(this.props.produtoIndex) {

      let p = this.props.pedido.produtos[produtoIndex]

      this.setState({
        selectedQuantidade: p.quantidade,
        selectedUnidade: p.unidade,
        descricao: p.obs,
        aceitaGenericos: p.generico,
        aceitaSimilares: p.similares,
        pedido: this.state.pedido.produtos.slice(produtoIndex-1, 1)
      })
    }

  }

render() {
  return (
    <ViewContainer>
      <FaHeader title='Detalhe do produto' onGoBack={() => this.props.navigator.pop()} />

        <View style={[this.state.showProgressBar ? {opacity: 1} : {opacity: 0}]}>
          <Progress.Bar progress={this.state.progress} height={4} color='#f90' borderRadius={0} width={width} />
        </View>

      <ScrollView style={{flex: 1}}>
        <View style={[s.box, {paddingBottom: 10}]}>

          <View style={info.item}>
            <FaInfo label='Nome' last={true} value={this.props.nome} />
          </View>

        </View>
      </ScrollView>

    </ViewContainer>
  )}
}
