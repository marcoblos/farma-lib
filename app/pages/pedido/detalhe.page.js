import React, { Component } from 'react';

import {Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  Image
} from 'react-native';

import {
  ViewContainer,
  FaHeader,
  FaRadioList,
  FaButton,
  FaInfo,
  FaImageZoom
} from 'fa-components';

import { ToasterService } from 'fa-services';

import * as Progress from 'react-native-progress';

import EStyleSheet from 'react-native-extended-stylesheet';
import Picker from 'react-native-picker';

import { PedidoModel, ProdutoModel } from 'fa-models';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Lightbox from 'react-native-lightbox';

import ImagePicker from 'react-native-image-picker';

import { RNS3 } from 'react-native-aws3';

const {height, width} = Dimensions.get('window');
const pedidoData = require('./_pedidoData.json');
const s = require('../../styles/core.js');

export class DetalhePage extends Component {
  constructor(props) {
    super(props);

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
      quantidadeError: false
    }
  }

  componentDidMount() {
    if(this.props.pedido) {
      this.setState({pedido: this.props.pedido});
    }

    if(this.props.produtoIndex) {

      let p = this.props.pedido.produtos[produtoIndex];

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

  _progressBarStatus(obj) {
    let progress = obj.loaded / obj.total;
    if( progress === 1) { this.setState({progress: 0}) }
    this.setState({progress});
  }

  uploadePhoto(file) {
    let self = this;
    const options = {
      bucket: 'farma-images',
      accessKey: 'AKIAJZXIXLFJVNT6GDTQ',
      secretKey: '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',
      region: 'sa-east-1',
      successActionStatus: 201
    };

    this.setState({showProgressBar: true});

    RNS3.put(file, options).then(response => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3', response);
      }
      setTimeout( function(){
        self.setState({showProgressBar: false});
      }, 1000);

    }).progress((e) => this._progressBarStatus(e));
  }

  selectPhotoTapped() {

    const options = {
      title: 'Foto do produto ou receita',
      takePhotoButtonTitle: 'Tirar Foto',
      chooseFromLibraryButtonTitle: 'Biblioteca de Fotos',
      cancelButtonTitle: 'Cancelar',
      quality: 0.8,
      maxWidth: 760,
      maxHeight: 760,
      noData: true,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchCamera(options, (response)  => {
        var source;

        const file = {
          uri: 'data:image/jpeg;base64,' + response.data,
          name: 'img'+Math.floor((Math.random() * 1000) + 1)+'.png',
          type: 'image/jpeg'
        }

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.uploadePhoto(file);

        let imagens = this.state.imagens;
        imagens.push(file);
        this.setState({imagens});
    });
  }


  _modalQuantidade(visible) {
    this.setState({showModalQuantidade: visible, quantidadeError: false});
  }

  _continuar() {

    if(this.state.selectedQuantidade === '' || this.state.selectedUnidade === '') {
      this.setState({quantidadeError: true});
      ToasterService.error('Selecione uma quantidade para continuar');
      return false;
    }

    let pedido = this.state.pedido;

    let produto = new ProdutoModel({
      generico: this.state.aceitaGenericos,
      similares: this.state.aceitaSimilares,
      nome: this.props.nome,
      obs: this.state.descricao,
      quantidade: this.state.selectedQuantidade,
      unidade: this.state.selectedUnidade,
      imagens: this.state.imagens
    });

    pedido.produtos.push(produto);

    this.props.navigator.push({
      name: "PedidoResumo",
      swipeBack: false,
      passProps: {
        pedido
      }
    })
  }

  _onSelectedQuantidade(selected) {
    this.setState({
      selectedQuantidade: selected
    });
  }

  _onSelectedUnidade(selected) {
    this.setState({
      selectedUnidade: selected
    });
  }

  _renderModal(img) {
    this.setState({imageZoomVisible: true, selectedImagemZoom: img})
  }

  _renderQuantidadeSelecionada() {
    let label = '';

    if(this.state.selectedQuantidade === '' && this.state.selectedUnidade === '') {
      label = 'Selecionar';
    } else if(this.state.selectedQuantidade !== '' && this.state.selectedQuantidade !== '01' && this.state.selectedUnidade !== '') {
      label = this.state.selectedQuantidade + ' ' + this.state.selectedUnidade + 's';
    } else {
      label = this.state.selectedQuantidade + ' ' + this.state.selectedUnidade;
    }

    return label
  }

  _addFakePhoto() {
    const aa = {
      uri: 'data:image/png;base64,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',
      name: 'img'+Math.floor((Math.random() * 1000) + 1)+'.png',
      type: 'image/png'
    };

    let o = this.state.imagens;

    o.push(aa);

    this.setState({imagens: o});

    this.uploadePhoto(aa);
  }

  _deletePhoto(index) {
    let o = this.state.imagens;
    o.splice(index, 1);
    this.setState({imagens: o});
  }

  _renderImagem(img, index) {

    return (
      <View key={index} style={{position: 'relative', width: 120}}>
        <TouchableOpacity onPress={() => this._renderModal(img)}>
          <View style={{padding: 5, backgroundColor: '#fff'}}>
            <Image style={{width: 110, height: 110, resizeMode:"cover"}} source={img} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'white', position: 'absolute', right: 5, top: 5, zIndex: 10, padding: 3}} onPress={() => this._deletePhoto(index)}>
          <Icon name='delete' size={25} style={{color: '#555'}} />
        </TouchableOpacity>
      </View>
    )
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

          <View style={info.container}>
            <View style={[info.item, {flex: 3}]}>
              <Text style={info.value}>Aceita genéricos</Text>
            </View>
            <View style={[info.item, {alignItems: 'flex-end'}]}>
              <Switch
                onValueChange={(value) => this.setState({aceitaGenericos: value})}
                value={this.state.aceitaGenericos} />
            </View>
          </View>

          <View style={info.container}>
            <View style={[info.item, {flex: 3}]}>
              <Text style={info.value}>Aceita similares</Text>
            </View>
            <View style={[info.item, {alignItems: 'flex-end'}]}>
              <Switch
                onValueChange={(value) => this.setState({aceitaSimilares: value})}
                value={this.state.aceitaSimilares} />
            </View>
          </View>

          <View style={info.container}>
            <View style={[info.item, {borderBottomWidth: 0}]}>
              <Text style={info.label}>Descrição</Text>
              <TextInput
                placeholder='Informações complementares'
                onChangeText={(text) => this.setState({descricao: text})}
                value={this.state.descricao}
                multiline={true}
                style={[s.input, {height: 80}]}
              />
            </View>
          </View>

      </View>

      <View style={s.padding}>
        <TouchableOpacity style={[aa.row, {marginBottom: 10}]} onPress={() => this._modalQuantidade(true) }>
          <View>
            <Text style={[aa.label, this.state.quantidadeError ? {color: 'red'} : {}]}>Quantidade</Text>
            <Text style={aa.value}>{this._renderQuantidadeSelecionada()}</Text>
          </View>
          <View style={aa.icon}>
            <Icon name="touch-app" size={33} color="#999" style={[this.state.quantidadeError ? {color: 'red'} : {}]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={aa.row} onPress={this.selectPhotoTapped.bind(this)}>
          <View>
            <Text style={aa.valueLarge}>Adicionar foto</Text>
          </View>
          <View style={aa.icon}>
            <Icon name="add-a-photo" size={33} color="#999" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[s.padding, {flexDirection: 'row'}]}>
        {this.state.imagens.map((img, index) => this._renderImagem(img, index))}
      </View>

      </ScrollView>

      <View style={s.padding}>
        <FaButton label='CONTINUAR' size='lg' iconSize={30} icon='arrow-forward' type='primary' onPress={() => this._continuar()} />
      </View>


      <Modal animationType={"fade"} transparent={true} visible={this.state.showModalQuantidade}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', paddingLeft: 30, paddingRight: 30}}>
        <Text style={{color: 'white'}}>Quantidade:</Text>
        <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 20, color: 'white'}}>{this._renderQuantidadeSelecionada()}</Text>
        <View style={{paddingLeft: 10, paddingRight: 0, borderRadius: 6, marginBottom: 20, backgroundColor: 'white', height: 270}}>
          <View style={{flexDirection: 'row', flex: 1, paddingTop: 5, paddingBottom: 5}}>
            <ScrollView style={{flex: 1, padding: 10}}>
              <FaRadioList options={pedidoData.Quantidade} selected={this.state.selectedQuantidade} onSelected={(selected) => this._onSelectedQuantidade(selected)} />
            </ScrollView>
            <ScrollView style={{flex: 2, padding: 10}}>
              <FaRadioList options={pedidoData.Unidade} selected={this.state.selectedUnidade} onSelected={(selected) => this._onSelectedUnidade(selected)} />
            </ScrollView>
          </View>
          </View>
          <FaButton label='Selecionar' type='primary' onPress={() => this._modalQuantidade(false)} />
          <FaButton label='Cancelar' type='link' onPress={() => this._modalQuantidade(false)} />
        </View>
      </Modal>

      <FaImageZoom
        image={this.state.selectedImagemZoom}
        visible={this.state.imageZoomVisible}
        onClose={() => this.setState({imageZoomVisible: false})} />

    </ViewContainer>
  )}
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
    backgroundColor: 'white'
  },
  label: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.7)',
    paddingBottom: 2
  },
  value: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.9)'
  },
  valueLarge: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.9)'
  },
  icon: {
    width: 50,
    flexDirection: 'column'
  },
  iconContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const base = EStyleSheet.create({
  cleanButton: {
    borderWidth: 1,
    borderColor: '$colors.gray1',
    padding: 15,
    flexDirection: 'row'
  },
  right: {
    alignItems: 'flex-end'
  },
  padding: {
    padding: 15
  }
});

const info = EStyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  label: {
    fontSize: 12,
    paddingBottom: 3,
    color: 'rgba(0,0,0,0.5)'
  },
  value: {
    fontSize: 14
  }
});
