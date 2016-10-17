import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Dimensions, StyleSheet, ActivityIndicator, ListView, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { PedidoService } from 'fa-services';

import { ViewContainer, FaHeader } from 'fa-components';

var DismissKeyboard = require('dismissKeyboard');

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { PedidoModel } from 'fa-models';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});

export class PedidoBuscar extends Component {
    constructor(props) {
        super(props);

        this.state = {
          productsDataSource: ds.cloneWithRows([]),
          text: '',
          currentProduct: {},
          isLoading: false,
          pedido: new PedidoModel()
        }
    }

    componentDidMount() {
      let self = this;

      if(this.props.pedido) {
        this.setState({pedido: this.props.pedido});
      }

      setTimeout( function() {
        self.refs['input'].focus();
      }, 500);
    }

    _buscar(el) {

      let self = this;

      clearTimeout(global.__waitTimer);

      global.__waitTimer = setTimeout(function () {

        if(el.text.length > 2) {

          let pedidoService = new PedidoService();

          self.setState({
            text: el.text,
            isLoading: true
          });

          pedidoService.getProducts(el.text)
            .then((res) => {
              let d = res;
              d.unshift({IDMedicamento: 0, Nome: el.text});

              self.setState({
                productsDataSource: ds.cloneWithRows(d),
                isLoading: false
              });

            })
            .catch((error) => {
                console.error(error);
            });
        }

      }, 500);
    }

    selectProduct(nome) {

      let self = this;

      DismissKeyboard();

      let product = {
        nome: nome,
        aceitaSimilares: false,
        aceitaGenericos: false,
        descricao: '',
        quantidade: '',
        fotos: ''
      }

      self.props.navigator.push({
        name: "DetalhePage",
        passProps: {
          pedido: this.state.pedido,
          nome: nome
        }
      })
    }

    _back() {
      let self = this;

      DismissKeyboard();

      setTimeout( function(){
        self.props.navigator.push({
          name: route,
          currentProduct: product
        })
      }, 500);
    }

    render() {
        return (
            <ViewContainer style={{backgroundColor: 'white'}}>

                <FaHeader title='Selecionar produto' onGoBack={() => this.props.navigator.pop()} />

                <View style={buscar.container}>
                  <TextInput
                    ref='input'
                    style={buscar.input}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder="Digite o nome do produto"
                    onChangeText={(text) => this._buscar({text})}
                    underlineColorAndroid={'transparent'}
                  />
                </View>

                <View style={[buscar.loader, this.state.isLoading ? buscar.loaderActive : {}]}>
                  <ActivityIndicator size="large" />
                </View>

                <ListView
                    keyboardShouldPersistTaps={true}
                    dataSource = {this.state.productsDataSource}
                    style={[this.state.isLoading ? {top: -900} : {}]}
                    renderRow = {
                       (rowData) => (
                          <TouchableOpacity onPress={() => this.selectProduct(rowData.Nome)} style={poc.row}>
                             <Text>{rowData.Nome}</Text>
                          </TouchableOpacity>
                       )
                    }
                />
              <KeyboardSpacer/>

            </ViewContainer>
        );
    }
}



const buscar = EStyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: '$colors.gray1'
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: '$radius',
    fontSize: 14
  },
  loader: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    zIndex: 10
  },
  loaderActive: {
    top: 130
  }
})


const poc = EStyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderColor: '$colors.gray1',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center'
  }
});
