import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Picker from 'react-native-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { PedidoModel, EnderecoModel } from 'fa-models'
import {
  Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native'
import {
  FaHeader,
  ViewContainer,
  FaButton,
} from 'farma-lib/components'

import { FaRadioList, FaFullButton, FaPageTitle, FaModalHeader, FaInput } from 'fa-components'

const { height, width } = Dimensions.get('window')
const pedidoData = require('./_pedidoData.json')
const s = require('../../styles/core.js')

export class PedidoEnderecoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      modalVisible: false,
      selectedQuantidade: '',
      selectedUnidade: '',
      currentProduct: {},
      descricao: '',
      aceitaGenericos: false,
      aceitaSimilares: false,
      quantidade: '',
      pedido: new PedidoModel(),
    }
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

  _continuar(e) {
    if (e === false) {
      this.setState({ modalVisible: false })

      e = new EnderecoModel({
        cep: this.refs.cep.getValue(),
        cidade: this.refs.cidade.getValue(),
        bairro: this.refs.bairro.getValue(),
        rua: this.refs.rua.getValue(),
        numero: this.refs.numero.getValue(),
        complemento: this.refs.complemento.getValue(),
        uf: this.refs.uf.getValue(),
      })
    }

    const pedido = this.state.pedido

    pedido.endereco = e

    this.props.navigator.push({
      name: 'pedido-pagamento',
      passProps: {
        pedido,
      },
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
      selectedQuantidade: selected,
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
        <FaHeader title="Selecionar endereço" onGoBack={() => this._backToHome()} />

        <ScrollView style={{ flex: 1 }}>

          <View style={[s.padding]}>

            <FaPageTitle title="Endereço de entrega" paddingBottom={false} subTitle="Selecione ou adicione o endereço de entrega." />

          </View>

          <View style={s.padding}>

            {this.props.enderecos.map((e, index) => {
              const label = [
                `${e.rua}, ${e.numero}, ${e.complemento}`,
                `${e.bairro}, ${e.cidade}`,
                `${e.cep}`,
              ]

              return (
                <FaFullButton
                  key={index}
                  title={e.bairro.toUpperCase()}
                  label={label}
                  onPress={() => this._continuar(e)}
                  borderBottom
                  padding={20}
                />
            )
            })}

            <TouchableOpacity style={aa.row} onPress={() => this.setModalVisible(true)}>
              <View>
                <Text style={aa.valueLarge}>Adicionar endereço</Text>
              </View>
              <View style={aa.icon}>
                <Icon name="add-circle" size={33} color="#999" />
              </View>
            </TouchableOpacity>

          </View>

        </ScrollView>


        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>

            <FaModalHeader title="Adicionar endereço" onClose={() => this.setModalVisible(false)} />

            <ScrollView keyboardShouldPersistTaps>

              <View style={{ backgroundColor: 'white', padding: 20, paddingBottom: 40 }}>

                <FaPageTitle title="Cadastro de endereço" paddingBottom={30} subTitle="Informe o endereço de entrega." />

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingRight: 15 }}>
                    <FaInput label="CEP" ref="cep" mask={{ type: 'zip-code' }} value="" required showErrors={this.state.showErrors} />
                  </View>
                  <View style={{ flex: 1 }} />
                </View>

                <FaInput label="Rua" ref="rua" value="" required showErrors={this.state.showErrors} />
                <FaInput label="Bairro" ref="bairro" value="" required showErrors={this.state.showErrors} />

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingRight: 15 }}>
                    <FaInput label="Cidade" ref="cidade" value="" required showErrors={this.state.showErrors} />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 15 }}>
                    <FaInput label="Estado" ref="uf" value="RS" required showErrors={this.state.showErrors} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingRight: 15 }}>
                    <FaInput label="Número" mask={{ type: 'only-numbers' }} ref="numero" value="" required showErrors={this.state.showErrors} />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 15 }}>
                    <FaInput label="Complemento" ref="complemento" value="" required showErrors={this.state.showErrors} />
                  </View>
                </View>

              </View>


            </ScrollView>

            <View style={{ padding: 10 }}>
              <FaButton label="Continuar" type="primary" onPress={() => this._continuar(false)} />
            </View>

            <KeyboardSpacer />


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
