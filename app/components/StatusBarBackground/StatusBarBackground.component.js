import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

export class StatusBarBackground extends Component {

  // light-content

  render() {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]}>
        <StatusBar barStyle={this.props.barStyle || 'default'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: 20,
    backgroundColor: 'black',
  },
})
