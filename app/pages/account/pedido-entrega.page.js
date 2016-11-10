import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { AccountService } from 'fa-services'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Alert,
} from 'react-native'
import {
  FaHeader,
  ViewContainer,
  FaButton,
} from 'farma-lib/components'

import { FaFullButton, FaIconMessage, FaModalHeader, FaProduct, FaInfo, FaInput, FaPageTitle, FaMessage, FaProductList } from 'fa-components'

const window = Dimensions.get('window')


export class PedidoEntregaPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      visible: false,
      page: 0,
      modalVisible: false,
    }

    this._accountService = new AccountService()
  }

  componentDidMount() {
    console.log(this.props.pedido)
  }

  onMomentumScrollEnd(e, state, context) {
    this.setState({ page: context.state.index })
    console.log(context.state.index)
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  _cancelarPedido() {
    const data = {
      TokenIonic: '37399709-9593-45fc-9d8c-8192ebcf2255',
      IDPedido: this.props.pedido.idPedido,
    }

    this._accountService.cancelarPedido(data)
    .then((response) => {
      this.props.navigator.resetTo({
        name: 'DashboardPage',
      })
    })
    .catch((error) => {
      alert('Não foi possível cancelar o pedido. Tente novamente mais tarde.')
    })
  }

  _finalizarPedido() {
    const data = {
      TokenIonic: '37399709-9593-45fc-9d8c-8192ebcf2255',
      IDPedido: this.props.pedido.idPedido,
    }

    this._accountService.finalizarPedido(data)
    .then((response) => {
      debugger
      this.props.navigator.resetTo({
        name: 'DashboardPage',
      })
    }).catch((error) => {
      debugger
      alert('Algo deu errado, tente novamente mais tarde.')
    })
  }

  _alertFinalizarPedido() {
    Alert.alert(
      'Confirmação',
      'Deseja informar que o pedido foi entregue?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed!') },
        { text: 'Sim', onPress: () => this._finalizarPedido() },
      ]
    )
  }

  _renderDescricao(p) {
    if (p.obs) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Icon name="message" size={13} style={{ color: 'rgba(0,0,0,0.3)', marginTop: 5, marginRight: 3 }} />
          <Text style={{ flex: 1, color: 'rgba(0,0,0,0.5)', paddingTop: 3 }}>{p.obs}</Text>
        </View>
      )
    }
  }

  _renderProduto(p, index) {
    return (
      <FaProductList product={p} />
    )
  }

  render() {
    return (
      <ViewContainer>

        <FaHeader title={`Pedido nº ${this.props.pedido.idPedido}`} onGoBack={() => this.props.navigator.pop()} />

        <ScrollView>

          <FaIconMessage type="info" icon="motorcycle" message="Entrega em andamento!" />

          <View style={styles.box}>

            <FaPageTitle paddingBottom={20} title={`Pedido nº ${this.props.pedido.idPedido}`} subTitle="Aguardando resposta da farmácia." />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="event" label="Data do pedido" value={this.props.pedido.dataPedido} />
              </View>
              <View style={{ flex: 1 }}>
                <FaInfo icon="access-time" label="Horário" value={this.props.pedido.horaPedido} />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="store" label="Farmácia" value={this.props.pedido.cotacoes[0].farmacia} />
              </View>
              <View style={{ flex: 1 }}>
                <FaInfo label="Total" valueStyle={{ fontWeight: 'bold' }} value={this.props.pedido.cotacoes[0].totalFormatado} />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="phone" label="Telefone" value={this.props.pedido.cotacoes[0].telefone} />
              </View>
              <View style={{ flex: 1 }}>
                <FaInfo label="Tele" value={this.props.pedido.cotacoes[0].freteFormatado} />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="access-time" last label="Tempo de entrega" value={this.props.pedido.cotacoes[0].tempoDeEntrega} />
              </View>

              <View style={{ flex: 1 }}>
                <FaInfo label="Pagamento" last value={this.props.pedido.cotacoes[0].formaPagamento} />
              </View>
            </View>

            <View style={{ paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginTop: 40, marginBottom: 20 }}>
              <Text style={{ color: '#999', fontWeight: 'bold' }}>PRODUTOS</Text>
            </View>

            {this.props.pedido.cotacoes[0].produtos.map((p, index) => this._renderProduto(p, index))}

            <View style={{ paddingTop: 30 }}>
              <FaButton label="RECEBI O PEDIDO" type="success" size="md" onPress={() => this._alertFinalizarPedido()} />
            </View>

          </View>
        </ScrollView>

      </ViewContainer>
    )
  }
}


const styles = EStyleSheet.create({
  box: {
    backgroundColor: '$colors.white1',
    padding: '$md',
  },
})
