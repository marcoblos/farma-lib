import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ListView, RefreshControl } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewContainer, FaFullButton, FaButton, FaHeader, FaProduct} from 'fa-components';
import { AccountService, LoaderService } from 'fa-services';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});

export class MeusPedidosPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        pedidosList: ds.cloneWithRows([]),
        showErrors: false,
        visible: false,
        refreshing: false
      }

      this._accountService = new AccountService();
  }

  componentDidMount() {
    console.log(this.props.pedidos);

    this.setState({pedidosList: ds.cloneWithRows(this.props.pedidos)})
  }


  _detalharPedido(idPedido, status) {

    let page = 'pedido';

    if(status === 2) { page = 'pedido-cotacoes' };
    if(status === 3) { page = 'pedido-andamento' };
    if(status === 4) { page = 'pedido-entrega' };
    if(status === 5) { page = 'pedido-finalizado' };

    let data = {
      IDPedido: idPedido
    };

    requestAnimationFrame(() => LoaderService.show());

    this._accountService.getPedido(data)
    .then((response) => {

      LoaderService.hide();

      this.props.navigator.push({
        name: page,
        passProps: {
          pedido: response
        }
      })
    })
    .catch((error) => {
      debugger;
      alert('Não foi possível carregar os dados do pedido.');
      LoaderService.hide();
    });
    //
    // if(status === 2) {
    //   this.props.navigator.push({
    //       name: 'cotacoes'
    //   });
    // }
    //
    // if(status === 3) {
    //   this.props.navigator.push({
    //       name: 'cotacoes-andamento'
    //   });
    // }
    //
    // if(status === 4) {
    //   this.props.navigator.push({
    //       name: 'cotacoes-entrega'
    //   });
    // }

  }

  _meusEnderecosPage() {
    this.props.navigator.push({
        name: 'meus-enderecos'
    });
  }

  _meusPedidosPage() {
    this.props.navigator.push({
        name: 'meus-pedidos'
    });
  }

  _logout() {

    this.props.navigator.resetTo({
        name: 'login-page'
    });
  }

  _renderPhoto() {
    // return (
    //   <Image style={perfil.photoImage} source={{uri: 'https://scontent-gru.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/10354156_811493015580115_3639935977396716883_n.jpg?oh=9aeeee37209efc32cb88c42d4d4f5e61&oe=58687C66'}} />
    // )
  }

  _renderRow(p, index) {

    let title = `Pedido nº ${p.IDPedido}`;
    let produtos = [];

    produtos.push(p.Prd);

    if(p.QtdPrd === 2) {
      produtos.push(` e mais 1 produto`);
    }

    if(p.QtdPrd > 2) {
      produtos.push(` e mais ${p.QtdPrd} produtos`);
    }

    return (
      <FaProduct key={index} title={title} notifications={p.NumNotificacoes} status={p.Status} product={produtos} onPress={() => this._detalharPedido(p.IDPedido, p.Status)} />
    )
  }

  _atualizarPedidos() {

    let user = {
      TokenIonic: '37399709-9593-45fc-9d8c-8192ebcf2255'
    };

    if(this.props.type === 'historico') {
      user = {
        TokenIonic: '37399709-9593-45fc-9d8c-8192ebcf2255',
        SomenteFinalizados: true
      };
    }

    LoaderService.show();

    this._accountService.getPedidosLista(user)
    .then((response) => {

      LoaderService.hide();
      this.setState({pedidosList: ds.cloneWithRows(response)});

    });
  }

  render() {
    return (
      <ViewContainer>

          <FaHeader title='Meus pedidos' onGoBack={() => this.props.navigator.pop()} />

            <ListView
              dataSource = {this.state.pedidosList}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this._atualizarPedidos()}
                />
              }
              renderRow = {(p, index) => this._renderRow(p, index)}
            />

      </ViewContainer>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: '$sm'
  }
});

const perfil = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '$colors.gray2'
  },
  photoImage: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '$colors.gray2'
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '$colors.black2'
  }
});
