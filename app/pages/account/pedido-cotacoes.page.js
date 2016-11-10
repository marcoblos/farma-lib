import React, { Component } from 'react'
import { MaskService } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/MaterialIcons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Swiper from 'react-native-swiper'
import EStyleSheet from 'react-native-extended-stylesheet'
import { PedidoModel } from 'fa-models'
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
import { FaFullButton, FaModalHeader, FaProduct, FaInfo, FaInput, FaPageTitle } from 'fa-components'

const window = Dimensions.get('window')

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10,
    }}
    >
      <Text>
        <Text style={{
          color: '#007aff',
          fontSize: 20,
        }}
        >{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export class PedidoCotacoesPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      visible: false,
      page: 0,
      modalVisible: false,
      cotacaoAtual: {},
      pedido: new PedidoModel(),
      total: 0,
    }

    this._accountService = new AccountService()
    this._maskService = new MaskService()
  }

  componentDidMount() {
    console.log(this.props.pedido)
    this.setState({
      pedido: this.props.pedido,
      contato: this.props.pedido.contato,
    })
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

  _logout() {
    this.props.navigator.resetTo({
      name: 'login-page',
    })
  }

  _renderPhoto() {
    // return (
    //   <Image style={perfil.photoImage} source={{uri: 'https://scontent-gru.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/10354156_811493015580115_3639935977396716883_n.jpg?oh=9aeeee37209efc32cb88c42d4d4f5e61&oe=58687C66'}} />
    // )
  }

  onMomentumScrollEnd(e, state, context) {
    this.setState({ page: context.state.index })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  _renderSlide(c, index) {
    return (
      <View key={index} style={styles.slideWrapper}>
        <View style={styles.slide}>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <FaInfo icon="store" label="Farmácia" value={c.farmacia} />
            </View>
            <View style={{ flex: 1 }}>
              <FaInfo label="Tele" value={c.freteFormatado} />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <FaInfo icon="access-time" last label="Tempo de entrega" value={c.tempoDeEntrega} />
            </View>

            <View style={{ flex: 1 }}>
              <FaInfo label="Total" valueStyle={{ fontWeight: 'bold' }} last value={this._maskService.toMoney(c.total > 0 ? c.totalFormatado : 0)} />
            </View>
          </View>
        </View>
      </View>
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

  _toggleAceito(p, cotacaoIndex) {
    const pedido = this.state.pedido
    const cotacao = pedido.cotacoes[cotacaoIndex]
    const produtos = cotacao.produtos

    produtos.forEach((prod) => {
      if (prod.id === p.id) {
        if (p.aceito === 1) {
          p.aceito = 0
          cotacao.total = cotacao.total - p.valor
        } else {
          p.aceito = 1
          cotacao.total = cotacao.total + p.valor
        }
      }
    })

    this.setState({ pedido })
  }

  _renderToggle(p, indexCotacao) {
    if (this.state.pedido.cotacoes[indexCotacao].produtos.length) {
      return (
        <View>
          <TouchableOpacity onPress={() => this._toggleAceito(p, indexCotacao)}>
            <Icon name="remove-circle-outline" size={25} style={{ color: '#999' }} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  _renderProduto(p, i, index) {
    return (
      <View key={i} style={[p.aceito === 0 ? { opacity: 0.4 } : {}, { flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }]}>
        <View style={{ flex: 1 }}>
          <Text>{p.nome}</Text>
          {this._renderDescricao(p)}
          <Text style={{ color: 'rgba(0,0,0,0.5)', paddingTop: 3 }}>{`${p.quantidade} ${p.unidade}`}</Text>
        </View>
        <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
          <Text style={[p.aceito === 0 ? { color: 'red' } : {}, { fontWeight: 'bold' }]}>{p.valorFormatado}</Text>
        </View>
        {this._renderToggle(p, index)}
      </View>
    )
  }

  _renderGroup(c, index) {
    return (
      <View key={index} style={[this.state.page === index ? {} : { position: 'absolute', height: 0, top: 0, overflow: 'hidden' }]}>
        {c.produtos.map((p, i) => this._renderProduto(p, i, index))}
      </View>
    )
  }

  _renderListaDeProdutos() {
    if (this.state.pedido.cotacoes.length) {
      return this.state.pedido.cotacoes.map((c, index) => this._renderGroup(c, index))
    }
  }

  _modalAceitarCotacao() {
    this.setState({ cotacaoAtual: this.state.pedido.cotacoes[this.state.page] })
    this.setModalVisible(true)
  }

  _aceitarCotacao() {
    const aceitos = []
    const produtos = []
    this.state.cotacaoAtual.produtos.forEach((p) => {
      produtos.push({
        Nome: p.nome,
        Qtd: p.quantidade,
        Un: p.unidade,
        Detalhes: p.obs,
        AceitaGenerico: p.generico,
        AceitaSimilares: p.similares,
        Imagens: p.imagens,
      })

      aceitos.push({
        IDProduto: p.id,
        Nome: p.nome,
        Aceito: 1,
      })
    })

    const data = {
      Pedido: {
        Produtos: produtos,
        TempoEntregaHoras: '0',
        TempoEntregaMinutos: '30',
        IDPedido: this.props.pedido.idPedido,
        FormaPagamento: this.state.cotacaoAtual.formaPagamento,
        Cartao: '',
        TrocoPara: this.refs.troco.getValue(),
        OutroPagamento: '',
        Status: 2,
        IDCotacao: this.state.cotacaoAtual.idCotacao,
        Nome: this.state.cotacaoAtual.farmacia,
        Frete: this.state.cotacaoAtual.frete,
        TempoEntrega: this.state.cotacaoAtual.tempoDeEntrega,
        Total: this.state.cotacaoAtual.total,
        Horarios: '',
        Telefone: 13123123123,
        Contato: this.refs.contato.getValue(),
        Celular: this.refs.celular.getValue(),
        Aceitos: aceitos,
      },

    }

    debugger

    this._accountService.aceitarCotacao(data)
    .then((response) => {
      debugger
    }).catch((error) => {
      debugger
      console.log(error)
    })
  }

  _next() {
    this.refs.swiper.scrollBy(1)
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

  _renderTitle() {
    let text = ''

    text = `oferta ${this.props.pedido.cotacoes.length}`

    if (this.props.pedido.cotacoes.length > 1) {
      text = `Oferta ${this.state.page + 1}/${this.props.pedido.cotacoes.length}`
    }

    return (
      <FaPageTitle style={{ backgroundColor: 'transparent' }} paddingBottom={3} theme="white" title={text} subTitle="Escolha uma farmácia para finalizar o pedido" />
    )
  }

  render() {
    return (
      <ViewContainer>

        <FaHeader title={`Pedido nº ${this.props.pedido.idPedido}`} onGoBack={() => this.props.navigator.pop()} />

        <ScrollView>

          <View style={styles.headerTop} />

          <View style={styles.header}>
            <View style={{ paddingTop: 25, paddingLeft: 30, paddingRight: 30 }}>
              {this._renderTitle()}
            </View>

            <Swiper
              ref="swiper"
              style={[styles.wrapper]}
              height={200}
              showsButtons={this.props.pedido.cotacoes.length > 1 || false}
              dot={<View style={{ backgroundColor: 'rgba(0,0,0, 0.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
              activeDot={<View style={{ backgroundColor: '#f90', width: 10, height: 10, borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
              showsPagination
              onMomentumScrollEnd={(e, state, context) => this.onMomentumScrollEnd(e, state, context)}
              paginationStyle={{
                bottom: 10,
              }}
              nextButton={<Icon name="chevron-right" size={30} style={{ marginRight: -10, color: 'rgba(0,0,0,0.25)' }} />}
              prevButton={<Icon name="chevron-left" size={30} style={{ marginLeft: -10, color: 'rgba(0,0,0,0.25)' }} />}
            >

              {this.props.pedido.cotacoes.map((c, index) => this._renderSlide(c, index))}
            </Swiper>
          </View>

          <View style={{ paddingTop: 120, backgroundColor: '#fff' }}>
            <View style={[{ padding: 20 }]}>

              {this._renderListaDeProdutos()}

            </View>
          </View>

          <View style={{ padding: 20, backgroundColor: 'white', paddingTop: 5 }}>
            <FaButton label="ACEITAR OFERTA" type="primary" onPress={() => this._modalAceitarCotacao()} />
            {this.props.pedido.cotacoes.length === 1 || <FaButton label="Próxima oferta" type="clean" style={{ marginTop: 15 }} onPress={() => this._next()} />}
          </View>

          <TouchableOpacity style={{ marginTop: 25, marginBottom: 25, alignItems: 'center' }} onPress={() => this._alertCancelarPedido()}>
            <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.3)', textDecorationLine: 'underline' }}>Cancelar pedido</Text>
          </TouchableOpacity>

        </ScrollView>

        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>

            <FaModalHeader title="Detalhe da oferta" onClose={() => this.setModalVisible(false)} />

            <ScrollView keyboardShouldPersistTaps>

              <View style={{ backgroundColor: 'white', padding: 20, paddingBottom: 50 }}>

                <FaPageTitle title="Complete os dados" paddingBottom={30} subTitle="Complete as informações para aceitar a oferta." />

                <FaInput label="Troco para quanto?" mask={{ type: 'money' }} ref="troco" value="" required showErrors={this.state.showErrors} />
                <FaInput label="Quem vai receber?" ref="contato" value="" required showErrors={this.state.showErrors} />
                <FaInput label="Celular" ref="celular" mask={{ type: 'cel-phone' }} value="" required showErrors={this.state.showErrors} />

                <View style={{ paddingTop: 30 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                      <FaInfo icon="store" label="Farmácia" value={this.state.cotacaoAtual.farmacia} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FaInfo label="Tele" value={this.state.cotacaoAtual.freteFormatado} />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                      <FaInfo icon="access-time" last label="Tempo de entrega" value={this.state.cotacaoAtual.tempoDeEntrega} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <FaInfo label="Total" last valueStyle={{ fontWeight: 'bold' }} value={this._maskService.toMoney(this.state.cotacaoAtual.total > 0 ? this.state.cotacaoAtual.totalFormatado : 0)} />
                    </View>
                  </View>
                </View>

              </View>


            </ScrollView>

            <View style={{ padding: 12 }}>
              <FaButton label="ACEITAR" type="primary" onPress={() => this._aceitarCotacao()} />
            </View>

            <KeyboardSpacer />


          </View>

        </Modal>

      </ViewContainer>
    )
  }
}


let styles = EStyleSheet.create({
  headerTop: {
    backgroundColor: '#80be5d',
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: -1,
  },
  header: {
    paddingBottom: 20,
    marginBottom: -140,
    zIndex: 10,
  },

  wrapper: {
  },
  slide: {
    padding: 25,
    backgroundColor: '#f3f3f3',
    flex: 1,
    margin: 20,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '$colors.gray2',
    overflow: 'hidden',
  },
  slideWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },

  container: {
    padding: '$sm',
  },
})
