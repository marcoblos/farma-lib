import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, Image, ActivityIndicator, Animated } from 'react-native'
import { ViewContainer, FaHeader } from 'fa-components'
import { AccountService, LoaderService, StorageService } from 'fa-services'
import { HttpRequestSettingsModel } from 'fa-models'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as axios from 'axios'
import { PedidoModel } from 'fa-models'
import EStyleSheet from 'react-native-extended-stylesheet'

import FCM from 'react-native-fcm';

export class DashboardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notificacoes: 0,
      pendentes: 0,
      loading: false,
      opacity: new Animated.Value(0),
    }

    this._accountService = new AccountService()
  }

  componentWillReceiveProps(next) {
    // this._refresh()
  }

  componentDidMount() {
    let self = this

    StorageService.getString('Usertoken')
      .then((Usertoken) => {
        if(Usertoken === null) {
          this.props.navigator.resetTo({name: "auth-page"})
        } else {
          axios.defaults.headers.common['Usertoken'] = Usertoken
          setTimeout( function() {
            self._refresh()
          }, 100)
        }
      })

      Animated.timing(
         this.state.opacity,
         {toValue: 1, duration: 650}
       ).start()

    StorageService.getObject('notificacoes')
    .then((response) => {
      this.setState({notificacoes: response.Notificacoes, pendentes: response.Pendentes})
    })



    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
        console.log("token device: ", token)
        if(token) {
          StorageService.setString('Devicetoken', token)
        }
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {

        console.log(notif);

        if(notif.local_notification) {

        }
        if(notif.opened_from_tray){

        }
    });
  }

  _refresh(Usertoken) {

    this.setState({loading: true})

    this._accountService.retornarNotificacoes()
    .then((response) => {

      this.setState({loading: false})
      StorageService.setObject('notificacoes', response)
      this.setState({notificacoes: response.Notificacoes, pendentes: response.Pendentes})

    }).catch((error) => {
      this.setState({loading: false})
      alert('Algo deu errado. Tente novamente mais tarde.')
    })
  }

  _novoPedido() {

    let pedido = new PedidoModel()

    this.props.navigator.push({
      name: "PedidoBuscar",
      passProps: {
        pedido: pedido
      }
    })
  }

  _accountPage() {

    this.props.navigator.push({
      name: "AccountPage"
    })
  }

  _backToHome() {
    this.props.navigator.pop()
  }

  _meusPedidosPage() {

    requestAnimationFrame(() => LoaderService.show())

    this._accountService.getPedidosLista()
    .then((response) => {

      LoaderService.hide()

      this.props.navigator.push({
        name: "meus-pedidos",
        passProps: {
          pedidos: response,
          type: 'pedidos'
        }
      })
    }).catch((error) => {
      console.error(error)
    })

  }

  _historico() {

    requestAnimationFrame(() => LoaderService.show())

    this._accountService.getInformacoesUsuario()
    .then((response) => {

      LoaderService.hide()

      this.props.navigator.push({
        name: "meus-pedidos",
        passProps: {
          pedidos: response
        }
      })
    })

  }

  _notificacoes() {

    LoaderService.show()

    this._accountService.getNotificacoesLista()
    .then((response) => {

      LoaderService.hide()

      this.props.navigator.push({
        name: "notificacoes",
        passProps: {
          pedidos: response
        }
      })
    }).catch((error) => {
      debugger;
    })

  }

  takePicture() {
    this.refs['cam'].capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }

render() {
  return (
    <Animated.View style={{flex: 1, opacity: this.state.opacity}}>
    <ViewContainer style={{backgroundColor: '#e6e6e6'}}>
      <FaHeader title='' style={{height: 118}} hideBackButton={true} />

      <View style={dashboard.ButtonContainer}>
        <TouchableHighlight style={dashboard.pedidoButton} underlayColor="#e76100" onPress={() => this._novoPedido() }>
          <Text style={dashboard.pedidoButtonText}>NOVO PEDIDO</Text>
        </TouchableHighlight>
      </View>

      <View style={logo.container}>
        <TouchableOpacity onPress={() => this._refresh()} activeOpacity={0.6} style={{paddingTop: 20}}>
          <View style={logo.size}><Image style={logo.farma} source={require('../../assets/img/farma-logo.png')} /></View>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>

        <ActivityIndicator animating={this.state.loading} size="small" style={{marginBottom: 20}} />

        <View style={dashboard.itens}>
          <TouchableOpacity onPress={() => this._meusPedidosPage()} activeOpacity={0.6} style={dashboard.item}>
            <Text style={dashboard.textLarge}>{this.state.pendentes}</Text>
            <Text>Pedidos</Text>
            <Text>pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._notificacoes()} activeOpacity={0.6} style={dashboard.item}>
            <Text style={dashboard.textLarge}>{this.state.notificacoes}</Text>
            <Text>Novas</Text>
            <Text>notificações</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', backgroundColor: '#888', paddingTop: 1}}>
        <TouchableOpacity onPress={() => this._accountPage()} activeOpacity={0.3} style={dashboard.bottomItem}>
          <Icon style={dashboard.icon} name='account-circle' />
          <Text style={dashboard.bottomItemText}>Minha conta</Text>
        </TouchableOpacity>
        <View style={{width: 1}}></View>
        <TouchableOpacity onPress={() => this._historico()} activeOpacity={0.3} style={dashboard.bottomItem}>
          <Icon style={dashboard.icon} name='watch-later' />
          <Text style={dashboard.bottomItemText}>HIstórico</Text>
        </TouchableOpacity>
      </View>

    </ViewContainer>
  </Animated.View>
  )}
}

const logo = EStyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  farma: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null
  },
  size: {
    width: '75%',
    height: '27%'
  }
})

const dashboard = EStyleSheet.create({
  ButtonContainer: {
    alignItems: 'center',
    marginTop: -25
  },
  pedidoButton: {
    backgroundColor: '$colors.primary',
    width: 250,
    height: 50,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pedidoButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '$colors.white1'
  },
  itens: {
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#ccc',
    paddingTop: 30,
    paddingBottom: 30,
    marginRight: -1
  },
  textLarge: {
    fontSize: 60,
    color: '#555'
  },
  bottomItem: {
    flexDirection: 'row',
    backgroundColor: '#999',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomItemText: {
    color: 'white'
  },
  icon: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 30,
    marginRight: 10
  }

})
