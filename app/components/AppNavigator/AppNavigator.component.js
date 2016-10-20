import React, {
    Component
} from 'react'
import {
    Navigator,
    Text,
    StyleSheet
} from 'react-native'

import {
    PocPage,
    RootPage,
    PedidoBuscar,
    DashboardPage,
    DetalhePage,
    PedidoResumo,
    AuthPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    MeusDadosPage,
    MeusEnderecosPage,
    EnderecoPage,
    PedidoEnderecoPage,
    PedidoPagamentoPage,
    PedidoPagamentoCartaoPage,
    FinalPage,
    MeusPedidosPage,
    CotacoesPage,
    CotacoesEmptyPage,
    CotacoesEntregaPage,
    CotacoesAndamentoPage,
    PedidoPage,
    PedidoAndamentoPage,
    PedidoEntregaPage,
    PedidoCotacoesPage,
    PedidoFinalizadoPage,
    NotificacoesPage
} from 'fa-pages'

export class AppNavigator extends Component {

    _renderScene(route, navigator) {
        var globalNavigatorProps = {
            navigator
        }

        switch (route.name) {
            case 'PocPage':
              return ( <PocPage {...globalNavigatorProps} {...route.passProps} />)
            case 'RootPage':
              return ( <RootPage {...globalNavigatorProps} {...route.passProps} />)
            case 'PedidoBuscar':
              return ( <PedidoBuscar {...globalNavigatorProps} {...route.passProps} />)
            case 'DashboardPage':
              return ( <DashboardPage {...globalNavigatorProps} {...route.passProps} />)
            case 'DetalhePage':
              return ( <DetalhePage {...globalNavigatorProps} {...route.passProps} currentProduct={route.currentProduct} />)
            case 'PedidoResumo':
              return ( <PedidoResumo {...globalNavigatorProps} {...route.passProps} products={route.products} />)
            case 'login-page':
              return ( <LoginPage {...globalNavigatorProps} {...route.passProps} />)
            case 'auth-page':
              return ( <AuthPage {...globalNavigatorProps} {...route.passProps} />)
            case 'RegisterPage':
              return ( <RegisterPage {...globalNavigatorProps} {...route.passProps} />)
            case 'AccountPage':
              return ( <AccountPage {...globalNavigatorProps} {...route.passProps} />)
            case 'meus-dados':
              return ( <MeusDadosPage {...globalNavigatorProps} {...route.passProps} />)
            case 'meus-enderecos':
              return ( <MeusEnderecosPage {...globalNavigatorProps} {...route.passProps} />)
            case 'endereco':
              return ( <EnderecoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-endereco':
              return ( <PedidoEnderecoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-pagamento':
              return ( <PedidoPagamentoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-pagamento-cartao':
              return ( <PedidoPagamentoCartaoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-final':
              return ( <FinalPage {...globalNavigatorProps} {...route.passProps} />)
            case 'meus-pedidos':
              return ( <MeusPedidosPage {...globalNavigatorProps} {...route.passProps} />)
            case 'cotacoes':
              return ( <CotacoesPage {...globalNavigatorProps} {...route.passProps} />)
            case 'cotacoes-empty':
              return ( <CotacoesEmptyPage {...globalNavigatorProps} {...route.passProps} />)
            case 'cotacoes-entrega':
              return ( <CotacoesEntregaPage {...globalNavigatorProps} {...route.passProps} />)
            case 'cotacoes-andamento':
              return ( <CotacoesAndamentoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido':
              return ( <PedidoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-andamento':
              return ( <PedidoAndamentoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-entrega':
              return ( <PedidoEntregaPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-cotacoes':
              return ( <PedidoCotacoesPage {...globalNavigatorProps} {...route.passProps} />)
            case 'pedido-finalizado':
              return ( <PedidoFinalizadoPage {...globalNavigatorProps} {...route.passProps} />)
            case 'notificacoes':
              return ( <NotificacoesPage {...globalNavigatorProps} {...route.passProps} />)
        }
    }


    _configureScene(route, routeStack) {

      let obj = { ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight }

      if(route.swipeBack === false) {
        obj = {
          ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight,
          gestures: {}
        }
      }

      return obj
    }

    render() {
        return (
            <Navigator
              initialRoute = {this.props.initialRoute}
              ref = 'navigator'
              style = {styles.navigatorStyles}
              renderScene = {this._renderScene}
              configureScene = {this._configureScene}
            />
        )
    }

}

const styles = StyleSheet.create({

    navigatorStyles: {
        flex: 1
    }

})
