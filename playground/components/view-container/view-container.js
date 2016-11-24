import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native'

export class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}, this.props.navbar ? styles.hasNavBar : {}]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e6e6e6',
    position: 'relative',
  },
  hasNavBar: {
    paddingTop: Platform.select({
      ios: 64,
      android: 50,
    })
  },

})
