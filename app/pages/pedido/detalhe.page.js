import React, { Component } from 'react'
import * as Progress from 'react-native-progress'
import Picker from 'react-native-picker'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Lightbox from 'react-native-lightbox'
import { RNS3 } from 'react-native-aws3'
import { ToasterService } from 'fa-services'
import {
  PedidoModel,
  ProdutoModel,
} from 'fa-models'
import { Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  Image,
} from 'react-native'
import {
  FaHeader,
  ViewContainer,
  FaButton,
} from 'fa-components'
import {
  FaRadioList,
  FaInfo,
  FaImageZoom,
  FaCamera,
} from 'fa-components'

const { height, width } = Dimensions.get('window')
const pedidoData = require('./_pedidoData.json')
const s = require('../../styles/core.js')

export class DetalhePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      swipeToClose: true,
      showModalQuantidade: false,
      selectedQuantidade: '',
      selectedUnidade: '',
      descricao: '',
      aceitaGenericos: false,
      aceitaSimilares: false,
      quantidade: '',
      selectedImagemZoom: '',
      imagens: [],
      showProgressBar: false,
      progress: 0,
      pedido: new PedidoModel(),
      produto: new ProdutoModel(),
      imageZoomVisible: false,
      quantidadeError: false,
      cameraVisible: false,
    }
  }

  componentDidMount() {
    if (this.props.pedido) {
      this.setState({ pedido: this.props.pedido })
    }

    if (this.props.produtoIndex) {
      const p = this.props.pedido.produtos[produtoIndex]

      this.setState({
        selectedQuantidade: p.quantidade,
        selectedUnidade: p.unidade,
        descricao: p.obs,
        aceitaGenericos: p.generico,
        aceitaSimilares: p.similares,
        pedido: this.state.pedido.produtos.slice(produtoIndex - 1, 1),
      })
    }
  }

  _progressBarStatus(obj) {
    const progress = obj.loaded / obj.total
    if (progress === 1) { this.setState({ progress: 0 }) }
    this.setState({ progress })
  }

  uploadePhoto(file) {
    const self = this
    const options = {
      bucket: 'farma-images',
      accessKey: 'AKIAJZXIXLFJVNT6GDTQ',
      secretKey: '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',
      region: 'sa-east-1',
      successActionStatus: 201,
    }

    this.setState({ showProgressBar: true })

    RNS3.put(file, options).then((response) => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3', response)
      }
      setTimeout(() => {
        self.setState({ showProgressBar: false })
      }, 1000)
    }).progress((e) => this._progressBarStatus(e))
  }

  _onCloseCamera() {
    this.setState({ cameraVisible: false })
  }

  _adicionarFoto() {
    this.setState({ cameraVisible: true })
  }

  _onPhoto(photo) {
    const file = {
      uri: photo,
      name: `_img${Math.floor((Math.random() * 1000) + 1)}.jpg`,
      type: 'image/jpeg',
    }

    this.uploadePhoto(file)

    const imagens = this.state.imagens
    imagens.push(file)
    this.setState({ imagens })
  }


  _modalQuantidade(visible) {
    this.setState({ showModalQuantidade: visible, quantidadeError: false })
  }

  _continuar() {
    if (this.state.selectedQuantidade === '' || this.state.selectedUnidade === '') {
      this.setState({ quantidadeError: true })
      ToasterService.error('Selecione uma quantidade para continuar')
      return false
    }

    const pedido = this.state.pedido

    const produto = new ProdutoModel({
      generico: this.state.aceitaGenericos,
      similares: this.state.aceitaSimilares,
      nome: this.props.nome,
      obs: this.state.descricao,
      quantidade: this.state.selectedQuantidade,
      unidade: this.state.selectedUnidade,
      imagens: this.state.imagens,
    })

    pedido.produtos.push(produto)

    this.props.navigator.push({
      name: 'PedidoResumo',
      swipeBack: false,
      passProps: {
        pedido,
      },
    })
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

  _renderModal(img) {
    this.setState({ imageZoomVisible: true, selectedImagemZoom: img })
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

    return label
  }

  _deletePhoto(index) {
    const o = this.state.imagens
    o.splice(index, 1)
    this.setState({ imagens: o })
  }

  _renderImagem(img, index) {
    return (
      <View key={index} style={{ position: 'relative', width: 120 }}>
        <TouchableOpacity onPress={() => this._renderModal(img)}>
          <View style={{ padding: 5, backgroundColor: '#fff' }}>
            <Image style={{ width: 110, height: 110, resizeMode: 'cover' }} source={img} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'white', position: 'absolute', right: 5, top: 5, zIndex: 10, padding: 3 }} onPress={() => this._deletePhoto(index)}>
          <Icon name="delete" size={25} style={{ color: '#555' }} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ViewContainer>
        <FaHeader title="Detalhe do produto" onGoBack={() => this.props.navigator.pop()} />

        <View style={[this.state.showProgressBar ? { opacity: 1 } : { opacity: 0 }]}>
          <Progress.Bar progress={this.state.progress} height={4} color="#f90" borderRadius={0} width={width} />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={[s.box, { paddingBottom: 10 }]}>

            <View style={info.item}>
              <FaInfo label="Nome" last value={this.props.nome} />
            </View>

            <View style={info.container}>
              <View style={[info.item, { flex: 3 }]}>
                <Text style={info.value}>Aceita genéricos</Text>
              </View>
              <View style={[info.item, { alignItems: 'flex-end' }]}>
                <Switch
                  onValueChange={(value) => this.setState({ aceitaGenericos: value })}
                  value={this.state.aceitaGenericos}
                />
              </View>
            </View>

            <View style={info.container}>
              <View style={[info.item, { flex: 3 }]}>
                <Text style={info.value}>Aceita similares</Text>
              </View>
              <View style={[info.item, { alignItems: 'flex-end' }]}>
                <Switch
                  onValueChange={(value) => this.setState({ aceitaSimilares: value })}
                  value={this.state.aceitaSimilares}
                />
              </View>
            </View>

            <View style={info.container}>
              <View style={[info.item, { borderBottomWidth: 0 }]}>
                <Text style={info.label}>Descrição</Text>
                <TextInput
                  placeholder="Informações complementares"
                  onChangeText={(text) => this.setState({ descricao: text })}
                  value={this.state.descricao}
                  multiline
                  style={[s.input, { height: 80 }]}
                />
              </View>
            </View>

          </View>

          <View style={s.padding}>
            <TouchableOpacity style={[aa.row, { marginBottom: 10 }]} onPress={() => this._modalQuantidade(true)}>
              <View>
                <Text style={[aa.label, this.state.quantidadeError ? { color: 'red' } : {}]}>Quantidade</Text>
                <Text style={aa.value}>{this._renderQuantidadeSelecionada()}</Text>
              </View>
              <View style={aa.icon}>
                <Icon name="touch-app" size={33} color="#999" style={[this.state.quantidadeError ? { color: 'red' } : {}]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={aa.row} onPress={() => this._adicionarFoto()}>
              <View>
                <Text style={aa.valueLarge}>Adicionar foto</Text>
              </View>
              <View style={aa.icon}>
                <Icon name="add-a-photo" size={33} color="#999" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[s.padding, { flexDirection: 'row' }]}>
            {this.state.imagens.map((img, index) => this._renderImagem(img, index))}
          </View>

        </ScrollView>

        <View style={s.padding}>
          <FaButton label="CONTINUAR" size="lg" iconSize={30} icon="arrow-forward" type="primary" onPress={() => this._continuar()} />
        </View>


        <Modal animationType={'fade'} transparent visible={this.state.showModalQuantidade}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', paddingLeft: 30, paddingRight: 30 }}>
            <Text style={{ color: 'white' }}>Quantidade:</Text>
            <Text style={{ fontWeight: 'bold', paddingBottom: 20, fontSize: 20, color: 'white' }}>{this._renderQuantidadeSelecionada()}</Text>
            <View style={{ paddingLeft: 10, paddingRight: 0, borderRadius: 6, marginBottom: 20, backgroundColor: 'white', height: 270 }}>
              <View style={{ flexDirection: 'row', flex: 1, paddingTop: 5, paddingBottom: 5 }}>
                <ScrollView style={{ flex: 1, padding: 10 }}>
                  <FaRadioList options={pedidoData.Quantidade} selected={this.state.selectedQuantidade} onSelected={(selected) => this._onSelectedQuantidade(selected)} />
                </ScrollView>
                <ScrollView style={{ flex: 2, padding: 10 }}>
                  <FaRadioList options={pedidoData.Unidade} selected={this.state.selectedUnidade} onSelected={(selected) => this._onSelectedUnidade(selected)} />
                </ScrollView>
              </View>
            </View>
            <FaButton label="Selecionar" type="primary" onPress={() => this._modalQuantidade(false)} />
            <FaButton label="Cancelar" type="link" onPress={() => this._modalQuantidade(false)} />
          </View>
        </Modal>

        <FaImageZoom
          image={this.state.selectedImagemZoom}
          visible={this.state.imageZoomVisible}
          onClose={() => this.setState({ imageZoomVisible: false })}
        />

        <FaCamera visible={this.state.cameraVisible} getPhoto={(foto) => this._onPhoto(foto)} onClose={() => this._onCloseCamera()} />

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
