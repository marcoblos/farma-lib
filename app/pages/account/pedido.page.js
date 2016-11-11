import React, { Component } from 'react'
import { AccountService } from 'fa-services'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
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
} from 'fa-components'
import { FaFullButton, FaModalHeader, FaProduct, FaInfo, FaInput, FaPageTitle, FaMessage, FaImageZoom, FaProductList } from 'fa-components'

const window = Dimensions.get('window')

export class PedidoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      visible: false,
      page: 0,
      modalVisible: false,
      selectedImagemZoom: '',
      imageZoomVisible: false,
    }

    this._accountService = new AccountService()
  }

  componentDidMount() {
    console.log(this.props.pedido)
  }

  _meusDadosPage() {
    this.props.navigator.push({
      name: 'meus-dados',
    })
  }

  _meusEnderecosPage() {
    this.props.navigator.push({
      name: 'meus-enderecos',
    })
  }

  _meusPedidosPage() {
    this.props.navigator.push({
      name: 'meus-pedidos',
    })
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

  _alertCancelarPedido() {
    Alert.alert(
      'Cancelar pedido',
      'Tem certeza que deseja cancelar o pedido?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed!') },
        { text: 'Sim', onPress: () => this._cancelarPedido() },
      ]
    )
  }

  _renderProduto(p, index) {
    return (
      <FaProductList product={p} />
    )
  }

  _renderPagamentoInfo() {
    if (this.props.pedido.formaPagamento === 'Dinheiro') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <FaInfo last label="Forma de pagamento" value={this.props.pedido.formaPagamento} />
          </View>
          <View style={{ flex: 1 }}>
            {this.props.pedido.trocoPara === '' || <FaInfo last label="Troco para" value={this.props.pedido.trocoPara} />}
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <FaInfo last label="Forma de pagamento" value={`Cartão - ${this.props.pedido.cartao}`} />
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <ViewContainer>

        <FaHeader title={`Pedido nº ${this.props.pedido.idPedido}`} onGoBack={() => this.props.navigator.pop()} />


        <ScrollView>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15, backgroundColor: '#f98e2e' }}>
            <Icon name="info" style={{ fontSize: 45, color: 'rgba(255,255,255,0.7)' }} />
            <View style={{ flex: 1, padding: 15, paddingTop: 20, paddingBottom: 20 }}>
              <Text style={{ color: 'white' }}>Esse pedido ainda não recebeu resposta de nenhuma farmácia até o momento.</Text>
            </View>
          </View>


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

            {this._renderPagamentoInfo()}

            <View>

              <View style={{ paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginTop: 40, marginBottom: 20 }}>
                <Text style={{ color: '#999', fontWeight: 'bold' }}>PRODUTOS</Text>
              </View>

              {this.props.pedido.produtos.map((p, index) => this._renderProduto(p, index))}


              <View style={{ paddingTop: 30 }}>
                <FaButton label="CANCELAR PEDIDO" type="danger" size="md" onPress={() => this._alertCancelarPedido()} />
              </View>
            </View>

          </View>
        </ScrollView>

      </ViewContainer>
    )
  }
}


let styles = EStyleSheet.create({
  box: {
    padding: '$md',
    backgroundColor: '$colors.white1',
  },
})
