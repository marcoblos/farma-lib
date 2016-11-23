import React, {
    Component,
} from 'react'
import {
    BackAndroid,
    Navigator,
    Text,
    StyleSheet,
    Animated,
    View,
    TouchableOpacity,
} from 'react-native'

import {
    PocPage,
    ButtonListPage,
    HomePage,
    SelectModalPage,
    InfoPage,
    CameraPage,
    IconMessagePage,
    ImageZoomPage,
    RadioListPage,
    ActionButtonPage,
    PedidoListPage,
    BoxViewPage,
    NovoPage,
    OutraPage,
    PedidoIndexPage,
    ContaIndexPage,
} from 'lib-pages'

import { FaIcon } from 'farma-lib'

export class AppNavigator extends Component {
  constructor(props) {
    super(props)

    this.navigator
  }

  _renderScene(route, navigator) {
    const globalNavigatorProps = {
      navigator,
    }
    this.navigator = globalNavigatorProps.navigator
    switch (route.name) {
      case 'PocPage':
        return (<PocPage {...globalNavigatorProps} {...route.passProps} />)
      case 'ButtonListPage':
        return (<ButtonListPage {...globalNavigatorProps} {...route.passProps} />)
      case 'HomePage':
        return (<HomePage {...globalNavigatorProps} {...route.passProps} />)
      case 'SelectModalPage':
        return (<SelectModalPage {...globalNavigatorProps} {...route.passProps} />)
      case 'InfoPage':
        return (<InfoPage {...globalNavigatorProps} {...route.passProps} />)
      case 'CameraPage':
        return (<CameraPage {...globalNavigatorProps} {...route.passProps} />)
      case 'IconMessagePage':
        return (<IconMessagePage {...globalNavigatorProps} {...route.passProps} />)
      case 'ImageZoomPage':
        return (<ImageZoomPage {...globalNavigatorProps} {...route.passProps} />)
      case 'RadioListPage':
        return (<RadioListPage {...globalNavigatorProps} {...route.passProps} />)
      case 'ActionButtonPage':
        return (<ActionButtonPage {...globalNavigatorProps} {...route.passProps} />)
      case 'PedidoListPage':
        return (<PedidoListPage {...globalNavigatorProps} {...route.passProps} />)
      case 'BoxViewPage':
        return (<BoxViewPage {...globalNavigatorProps} {...route.passProps} />)
      case 'NovoPage':
        return (<NovoPage {...globalNavigatorProps} {...route.passProps} />)
      case 'OutraPage':
        return (<OutraPage {...globalNavigatorProps} {...route.passProps} />)
      case 'PedidoIndexPage':
        return (<PedidoIndexPage {...globalNavigatorProps} {...route.passProps} />)
      case 'ContaIndexPage':
        return (<ContaIndexPage {...globalNavigatorProps} {...route.passProps} />)
    }
  }


    componentWillMount() {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
          this.navigator.pop()
          return true
        }
        return false
      })
    }

    _configureScene(route, routeStack) {
      let obj = { ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight }

      if (route.swipeBack === false) {
        obj = {
          ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight,
          gestures: {},
        }
      }
      return obj
    }



    render() {
      return (
        <Navigator
          initialRoute={this.props.initialRoute}
          ref="navigator"
          style={styles.navigatorStyles}
          renderScene={this._renderScene.bind(this)}
          configureScene={this._configureScene}
        />
          )
    }

  }


  class NavigationBar extends Navigator.NavigationBar {

    constructor(props) {
      super(props)

      this.state = {
        top: new Animated.Value(0)
      }
    }

    esconde() {

      Animated.timing(
          this.state.top,
          {toValue: -50, duration: 300, friction: 1, }
      ).start();
    }

    mostra() {

      Animated.timing(
          this.state.top,
          {toValue: 0, duration: 100, friction: 1, }
      ).start();
    }


    render() {

      // var routes = this.props.navState.routeStack;
      //
      // if (routes.length) {
      //   var route = routes[routes.length - 1];
      //
      //   if (route.passProps && route.passProps.navbar === false || route.hideNavBar === true) {
      //     this.esconde()
      //     return false
      //   }
      //
      //   if(route.name === 'DashboardPage') {
      //     this.esconde()
      //   }else {
      //     this.mostra()
      //   }
      // }

      // this.mostra()

      return (
      <Animated.View style={{height: 50, backgroundColor: 'blue', position: 'absolute', top: this.state.top, left: 0, zIndex: 200, right: 0}}>
        {super.render()}
      </Animated.View>
      )


    }
  }

  const styles = StyleSheet.create({

    navigatorStyles: {
      flex: 1,
    },
    navBar: {
      backgroundColor: '#555'
    }

  })
