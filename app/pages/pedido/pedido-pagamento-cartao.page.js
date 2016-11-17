import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView, Modal, Dimensions } from 'react-native'
import { FaRadioList, FaFullButton, FaPageTitle } from 'fa-components'

import {
  NavBar,
  ViewContainer,
} from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'

const { height } = Dimensions.get('window')
const s = require('../../styles/core.js')

export class PedidoPagamentoCartaoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      modalVisible: false,
      cartao: '',
      selectedUnidade: '',
      currentProduct: {},
      descricao: '',
      aceitaGenericos: false,
      aceitaSimilares: false,
      quantidade: '',
    }

    this.cartoes = [
      { value: 'Visa' },
      { value: 'Master' },
      { value: 'Elo Refeição' },
    ]
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  openModal1(id) {
    this.refs.modal1.open()
  }

  _continuar() {
    this.props.navigator.push({
      name: 'PedidoResumo',
      products: product,
    })
  }

  _selecionarCartao() {
    this.props.navigator.push({
      name: 'pedido-pagamento-cartao',
    })
  }

  _backToHome() {
    this.props.navigator.pop()
  }

  aaa() {
    this.picker.toggle()
  }

  _onSelectedQuantidade(selected) {
    this.setState({
      cartao: selected,
    })
  }

  _onSelectedUnidade(selected) {
    this.setState({
      selectedUnidade: selected,
    })
  }

  _renderQuantidadeSelecionada() {
    let label = ''

    if (this.state.selectedQuantidade === '' && this.state.selectedUnidade === '') {
      label = 'Selecionar'
    } else if (this.state.selectedQuantidade !== '' && this.state.selectedQuantidade !== '01' && this.state.selectedUnidade !== '') {
      label = `${this.state.selectedQuantidade} ${this.state.selectedUnidade}s`
    } else {
      label = `${this.state.selectedQuantidade} ${this.state.selectedUnidade}`
    }

    return (
      <Text>{label}</Text>
    )
  }

  render() {
    return (
      <ViewContainer style={{ backgroundColor: '#e6e6e6' }}>
        <NavBar title="Forma de pagamento" onGoBack={() => this._backToHome()} />

        <ScrollView style={{ flex: 1 }}>

          <View style={[s.padding, styles.box]}>

            <FaPageTitle title="CARTAO DE CRÉDITO" paddingBottom={20} subTitle="Selecione a forma do cartão de crédito." />

            <FaFullButton
              title="VISA"
              onPress={() => this._continuar()}
              borderBottom
              padding={20}
            />

            <FaFullButton
              title="MASTER"
              onPress={() => this._selecionarCartao()}
              borderBottom
              padding={20}
            />

            <FaFullButton
              title="REFEIÇÃO"
              onPress={() => this._selecionarCartao()}
              borderBottom
              padding={20}
            />

          </View>

        </ScrollView>


        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', paddingLeft: 30, paddingRight: 30 }}>

            <Text style={{ color: 'white' }}>Cartão de crédito:</Text>
            <Text style={{ fontWeight: 'bold', paddingBottom: 20, fontSize: 20, color: 'white' }}>{this._renderQuantidadeSelecionada()}</Text>

            <View style={{ paddingLeft: 10, paddingRight: 0, borderRadius: 6, marginBottom: 20, backgroundColor: 'white', height: 100 }}>
              <FaRadioList options={this.cartoes} selected={this.state.cartao} onSelected={(selected) => this._onSelectedQuantidade(selected)} />

            </View>

            <TouchableOpacity style={bottom.button} onPress={() => this.setModalVisible(false)}>
              <Text style={bottom.buttonText}>Selecionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={bottom.link} onPress={() => this.setModalVisible(false)}>
              <Text style={bottom.linkText}>Cancelar</Text>
            </TouchableOpacity>


          </View>

        </Modal>

      </ViewContainer>
  ) }
}


const aa = EStyleSheet.create({
  row: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '$colors.gray1',
    height: 60,
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.7)',
    paddingBottom: 2,
  },
  value: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.9)',
  },
  valueLarge: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.9)',
  },
  icon: {
    width: 50,
    flexDirection: 'column',
  },
  iconContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const teste = EStyleSheet.create({
  row: {
    padding: 20,
  },
})


const base = EStyleSheet.create({
  cleanButton: {
    borderWidth: 1,
    borderColor: '$colors.gray1',
    padding: 15,
    flexDirection: 'row',
  },
  right: {
    alignItems: 'flex-end',
  },
  padding: {
    padding: 15,
  },
})

const bottom = EStyleSheet.create({
  button: {
    backgroundColor: '$colors.primary',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  link: {
    marginTop: 20,
    marginBottom: 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
})

const styles = EStyleSheet.create({
  box: {
    paddingTop: '$md',
  },
})

const info = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  label: {
    fontSize: 12,
    paddingBottom: 3,
    color: 'rgba(0,0,0,0.5)',
  },
  value: {
    fontSize: 14,
  },
})
