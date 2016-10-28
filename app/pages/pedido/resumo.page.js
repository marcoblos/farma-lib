import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Switch, TextInput, ScrollView, Modal, Alert, Image } from 'react-native'
import { ViewContainer, FaHeader, FaButton, FaImageZoom } from 'fa-components'

import { AccountService, LoaderService, ToasterService } from 'fa-services'

import { PedidoModel } from 'fa-models'

import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

const s = require('../../styles/core.js')

export class PedidoResumo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageZoomVisible: false,
      selectedImagemZoom: '',
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      modalVisible: false,
      pedido: new PedidoModel(),
    }

    this._accountService = new AccountService()
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
    const pedido = this.state.pedido

    if (pedido.produtos && pedido.produtos.length === 0) {
      ToasterService.error('Adicione produtos para continuar com o pedido.')
      return false
    }

    LoaderService.show()

    this._accountService.getEnderecos()
    .then((response) => {
      LoaderService.hide()

      this.props.navigator.push({
        name: 'pedido-endereco',
        passProps: {
          pedido,
          enderecos: response,
        },
      })
    }).catch((error) => {
      LoaderService.hide()
      console.error(error)
    })
  }

  _editarProduto(index) {
    const pedido = this.state.pedido

    this.props.navigator.push({
      name: 'DetalhePage',
      passProps: {
        pedido,
        produtoIndex: index,
        nome: pedido.produtos[index].nome,
      },
    })
  }

  _addProduto() {
    const pedido = this.state.pedido

    this.props.navigator.push({
      name: 'PedidoBuscar',
      passProps: {
        pedido,
      },
    })
  }

  _cancelarPedido() {
    this.props.navigator.resetTo({
      name: 'DashboardPage',
    })
  }

  _cancelarPedidoAlert() {
    Alert.alert(
      'Cancelar pedido',
      'Tem certeza que deseja cancelar o pedido?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed!') },
        { text: 'Sim', onPress: () => this._cancelarPedido() },
      ]
    )
  }

  _backToHome() {
    this.props.navigator.pop()
  }

  _renderImagem(img, index) {
    return (
      <View key={index} style={{ position: 'relative', width: 50 }}>
        <TouchableOpacity onPress={() => this._renderModal(img)}>
          <View style={{ padding: 5, backgroundColor: '#fff' }}>
            <Image style={{ width: 40, height: 40, resizeMode: 'cover' }} source={img} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _formatarQuantidade(unidade, quantidade) {
    let label = ''

    if (quantidade === '' && unidade === '') {
      label = 'Selecionar'
    } else if (quantidade !== '' && quantidade !== '01' && unidade !== '') {
      label = `${quantidade} ${unidade}s`
    } else {
      label = `${quantidade} ${unidade}`
    }

    return label
  }

  _renderGenericos(p) {
    if (p.generico) {
      return (<Text style={product.text}>Aceita genéricos</Text>)
    }
  }

  _renderSimilares(p) {
    if (p.similares) {
      return (<Text style={product.text}>Aceita similares</Text>)
    }
  }

  _renderDescricao(p) {
    if (p.obs) {
      return (<Text style={product.text}>{p.obs}</Text>)
    }
  }

  _renderModal(img) {
    this.setState({ imageZoomVisible: true, selectedImagemZoom: img })
  }

  _removerProduto(index) {
    const p = this.state.pedido
    p.produtos.splice(index, 1)
    this.setState({ pedido: p })
  }

  _renderProduto(p, index) {
    return (
      <View key={index} style={product.box}>
        <View style={product.header}>
          <Text style={product.headerName}>{p.nome}</Text>
        </View>

        {this._renderDescricao(p)}
        <Text style={product.text}>{this._formatarQuantidade(p.unidade, p.quantidade)}</Text>
        {this._renderGenericos(p)}
        {this._renderSimilares(p)}


        <View style={product.bottom}>

          <TouchableOpacity
            style={product.bottomLink}
            onPress={() => Alert.alert(
              'Excluir produto',
              'Tem certeza que deseja excluir?',
              [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed!') },
                { text: 'Excluir', onPress: () => this._removerProduto(index) },
              ]
            )}
          >
            <View style={product.bottomColIcon}>
              <Icon name="delete" size={20} style={product.bottomLinkIcon} />
            </View>
            <View style={product.bottomCol}>
              <Text style={product.bottomLinkText}>Excluir</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={[s.padding, { flexDirection: 'row', position: 'absolute', bottom: 0, right: 0 }]}>
          {p.imagens.map((img, index) => this._renderImagem(img, index))}
        </View>

      </View>
    )
  }

  render() {
    return (
      <ViewContainer style={{ backgroundColor: '#e6e6e6' }}>
        <FaHeader title="Resumo do pedido" hideBackButton />


        <ScrollView>

          <View style={s.box}>
            {this.state.pedido.produtos.map((p, index) => this._renderProduto(p, index))}
          </View>

          <View style={s.padding}>
            <TouchableOpacity style={aa.row} onPress={() => this._addProduto()}>
              <View>
                <Text style={aa.valueLarge}>Adicionar produto</Text>
              </View>
              <View style={aa.icon}>
                <Icon name="add-circle" size={35} color="#999" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 25, marginBottom: 25, alignItems: 'center' }} onPress={() => this._cancelarPedidoAlert()}>
              <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.3)', textDecorationLine: 'underline' }}>Cancelar pedido</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>

        <View style={s.padding}>
          <FaButton label="CONTINUAR" size="lg" iconSize={30} icon="arrow-forward" type="primary" onPress={() => this._continuar()} />
        </View>

        <FaImageZoom
          image={this.state.selectedImagemZoom}
          visible={this.state.imageZoomVisible}
          onClose={() => this.setState({ imageZoomVisible: false })}
        />

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

const product = EStyleSheet.create({
  box: {
    backgroundColor: '$colors.white1',
    padding: 15,
    borderRadius: 3,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 7,
    paddingBottom: 7,
  },
  headerName: {
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 13,
    marginTop: 2,
    color: 'rgba(0,0,0,0.6)',
  },
  iconWrap: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  icon: {
    color: 'rgba(0,0,0,0.4)',
  },
  iconCount: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    left: -5,
  },
  iconCountText: {
    color: 'white',
    fontSize: 12,
  },
  bottom: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginRight: 10,
    borderRadius: 3,
  },
  bottomColIcon: {
    paddingRight: 5,
  },
  bottomLinkIcon: {
    color: 'red',
    color: 'rgba(0,0,0,0.4)',
  },
})
