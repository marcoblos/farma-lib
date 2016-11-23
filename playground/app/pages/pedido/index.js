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
} from 'lib-pages'

import { FaIcon } from 'farma-lib'

export class PedidoIndexPage extends Component {
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
      case 'NovoPage':
        return (<NovoPage {...globalNavigatorProps} globalNavigator={this.props.navigator} {...route.passProps} />)
      case 'OutraPage':
        return (<OutraPage {...globalNavigatorProps} globalNavigator={this.props.navigator} {...route.passProps} />)
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
      <View style={{flex: 1, backgroundColor: 'red'}}>

      <Navigator
        initialRoute={{name: 'OutraPage'}}
        ref="navigatorIn"
        style={styles.navigatorStyles}
        renderScene={this._renderScene.bind(this)}
        configureScene={this._configureScene}
        navigationBar={
            <NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                 {

                   if (index === 0 && this.props.navigator) {
                     return (
                       <TouchableOpacity style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}} onPress={() => this.props.navigator.pop()}>
                         <View>
                           <FaIcon name="keyboard-arrow-left" size={30} style={{color: 'white'}} />
                         </View>
                       </TouchableOpacity>
                     )
                   } else {
                     return (
                       <TouchableOpacity style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}} onPress={() => navigator.pop()}>
                         <View>
                           <FaIcon name="keyboard-arrow-left" size={30} style={{color: 'white'}} />
                         </View>
                       </TouchableOpacity>
                     );
                   }
                 },
                 RightButton: (route, navigator, index, navState) =>
                   {
                     return (
                       <View>
                         <FaIcon name="history" size={30} style={{color: 'white'}} />
                       </View>
                     ) },
                 Title: (route, navigator, index, navState) =>
                   { return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>{route.title}</Text>
                    </View>
                   ) },
               }}
                style={styles.navBar}
            />
        }
      />
    </View>
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
    backgroundColor: '#999'
  }

})
