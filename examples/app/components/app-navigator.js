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
    Home,
} from 'fa-pages'

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
      case 'home-page':
        return (<Home {...globalNavigatorProps} {...route.passProps} />)
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