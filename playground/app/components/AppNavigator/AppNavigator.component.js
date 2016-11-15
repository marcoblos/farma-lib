import React, {
    Component,
} from 'react'
import {
    BackAndroid,
    Navigator,
    Text,
    StyleSheet,
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
} from 'lib-pages'

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

const styles = StyleSheet.create({

  navigatorStyles: {
    flex: 1,
  },

})
