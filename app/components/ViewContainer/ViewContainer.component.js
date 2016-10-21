'use strict'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { PocPage, MainPage } from 'fa-pages'

export class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  viewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#e6e6e6',
    position: 'relative'
  }

})
