import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Switch, TextInput, ScrollView, Modal, Dimensions } from 'react-native'
import { ViewContainer, FaHeader, FaRadioList, FaButton, FaFullButton, FaPageTitle, FaMessage } from 'fa-components'

import { PedidoService, LoaderService, ToasterService } from 'fa-services'

import EStyleSheet from 'react-native-extended-stylesheet'
import Picker from 'react-native-picker'

import { PedidoModel } from 'fa-models'

import Icon from 'react-native-vector-icons/MaterialIcons'

const { height, width } = Dimensions.get('window')
const pedidoData = require('./_pedidoData.json')
const s = require('../../styles/core.js')

export class PedidoPagamentoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      modalVisible: false,
      cartao: '',
      sCartao: false,
      sDinheiro: false,
      selecionarCartao: false,
      pedido: new PedidoModel(),
    }

    this._pedidoService = new PedidoService()

    this.cartoes = [
      { value: 'Visa' },
      { value: 'Master' },
      { value: 'Goodcard' },
      { value: 'Alimentação' },
      { value: 'Refeição' },
    ]
  }

  componentDidMount() {
    if (this.props.pedido) {
      this.setState({ pedido: this.props.pedido })
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  openModal1(id) {
    this.refs.modal1.open()
  }

  _continuar() {
    if (this.state.sDinheiro === false && this.state.sCartao === false) {
      ToasterService.error('Selecione uma forma de pagamento.')
      return false
    }

    if (this.state.sCartao && this.state.cartao === '') {
      ToasterService.error('Selecione um cartão.')
      return false
    }


    const pedido = this.state.pedido

    if (this.state.sDinheiro) {
      pedido.formaPagamento = 'Dinheiro'
    }

    if (this.state.sCartao) {
      pedido.formaPagamento = 'Cartão de Crédito'
      pedido.cartao = this.state.cartao
    }

    const produtos = []

    pedido.produtos.forEach((p, index) => {
      const imagens = []

      p.imagens.forEach((img) => {
        imagens.push(img.name)
      })

      produtos.push({
        Nome: p.nome,
        Qtd: p.quantidade,
        Un: p.unidade,
        Detalhes: p.obs,
        AceitaGenerico: p.generico,
        AceitaSimilares: p.similares,
        DesejaFotos: 0,
        Imagens: imagens,
      })
    })

    const data = {
      Pedido: {
        Produtos: produtos,
        DesejaFotos: 0,
        TolerenciaEspera: 0,
        FormaPagamento: pedido.formaPagamento,
        Cartao: pedido.cartao,
        TrocoPara: '',
        OutroPagamento: '',
        TeleEntregaAgora: 0,
        CEP: pedido.endereco.cep,
        Rua: pedido.endereco.rua,
        Numero: pedido.endereco.numero,
        Complemento: pedido.endereco.complemento,
        Cidade: pedido.endereco.cidade,
        UF: pedido.endereco.uf,
        Bairro: pedido.endereco.bairro,
      },
    }

    LoaderService.show()

    this._pedidoService.realizarPedido(data)
    .then((response) => {
      debugger

      LoaderService.hide()

      this.props.navigator.push({
        name: 'pedido-final',
        swipeBack: false,
        passProps: {
          idPedido: response.IDPedido,
        },
      })
    }).catch((error) => {
      LoaderService.hide()
      console.error(error)
    })
  }

  _selecionarCartao() {
    this.setState({ selecionarCartao: true })
    // this.props.navigator.push({
    //   name: "pedido-pagamento-cartao"
    // })
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

  _renderCartoes() {
    return (
      <View style={[s.padding, styles.boxMs]}>
        <FaRadioList options={this.cartoes} selected={this.state.cartao} onSelected={(selected) => this._onSelectedQuantidade(selected)} />
      </View>
    )
  }

  render() {
    return (
      <ViewContainer style={{ backgroundColor: '#e6e6e6' }}>
        <FaHeader title="Forma de pagamento" onGoBack={() => this._backToHome()} />

        <ScrollView style={{ flex: 1 }}>

          <View style={[s.padding]}>

            <FaPageTitle title="Forma de pagamento" paddingBottom={false} subTitle="Selecione a forma de pagamento." />

          </View>

          <View style={[s.box, { padding: 10, backgroundColor: 'white' }]}>
            <View style={info.container}>
              <View style={[info.item, { flex: 3 }]}>
                <Text style={info.value}>Dinheiro</Text>
              </View>
              <View style={[info.item, { alignItems: 'flex-end' }]}>
                <Switch
                  onValueChange={(value) => this.setState({ sDinheiro: value })}
                  value={this.state.sDinheiro}
                />
              </View>
            </View>

            <View style={info.container}>
              <View style={[info.item, { flex: 3, borderBottomWidth: 0 }]}>
                <Text style={info.value}>Cartão de crédito</Text>
              </View>
              <View style={[info.item, { alignItems: 'flex-end', borderBottomWidth: 0 }]}>
                <Switch
                  onValueChange={(value) => this.setState({ sCartao: value })}
                  value={this.state.sCartao}
                />
              </View>
            </View>

            {!this.state.sCartao || this._renderCartoes()}
          </View>

        </ScrollView>

        <View style={s.padding}>
          <FaButton label="FINALIZAR PEDIDO" size="lg" iconSize={30} icon="done" type="primary" onPress={() => this._continuar()} />
        </View>


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
  boxMs: {
    paddingLeft: '$md',
    paddingRight: '$md',
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
