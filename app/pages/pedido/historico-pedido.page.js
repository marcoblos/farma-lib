import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Picker from 'react-native-picker'
import { AccountService, LoaderService } from 'fa-services'
import {
  Text,
  TouchableOpacity,
  View,
  Switch,
  ListView,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native'
import {
  NavBar,
  ViewContainer,
  FaButton,
} from 'fa-components'

import { FaRadioList, FaFullButton, FaPageTitle, FaMessage, FaProduct } from 'fa-components'
const { height, width } = Dimensions.get('window')

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.IDPedido !== r2.IDPedido })

export class HistoricoPedidoPage extends Component {
  constructor(props) {
    super(props)
    this.accountService = new AccountService()
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    debugger
    if (this.props.pedidos) {
      this.setState({ pedidos: this.props.pedidos })
      this.setState({ dataSource: ds.cloneWithRows(this.props.pedidos) })
    }
  }

  _detalharPedido(idPedido, status) {
    let page = 'pedido-finalizado',
      data = {
        IDPedido: idPedido,
      }
    requestAnimationFrame(() => LoaderService.show())
    this.accountService.getPedido(data)
      .then((response) => {
        LoaderService.hide()
        this.props.navigator.push({
          name: page,
          passProps: {
            pedido: response,
          },
        })
      })
      .catch((error) => {
        console.error(error)
        alert('Não foi possível carregar os dados do pedido.')
        LoaderService.hide()
      })
  }

  _renderRow(p, index) {
    const title = `Pedido nº ${p.IDPedido}`
    const product = 'Olá'
    return (
      <FaProduct key={index} title={title} product={product} status={p.Status} onPress={() => this._detalharPedido(p.IDPedido, p.Status)} />
    )
  }

  _renderPage() {
    if (this.props.pedidos.length > 0) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(p, index) => this._renderRow(p, index)}
        />
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FaMessage icon="inbox" title="Sem pedidos :(" text="Você não tem pedidos. Faça um pedido e receba as melhores ofertas! :)" />
          <FaButton label="NOVO PEDIDO" type="primary" size="lg" style={{ borderRadius: 0 }} />
        </View>
        )
    }
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title="Histórico de pedidos" onGoBack={() => this.props.navigator.pop()} />

        {this._renderPage()}

      </ViewContainer>
      )
  }
}
