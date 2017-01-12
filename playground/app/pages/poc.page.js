import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
} from 'react-native'

import { NavBar, FaSelectModal, FaButton, Input, ZoomableImageTwo } from 'farma-lib'



export class PocPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalSelectVisible: false,
      valorSelecionado: 'Selecione...'
    }
  }


  zoom() {
    alert('aasda');

    this.refs['image'].layout()
  }


  teste(obj) {

    console.log(obj);
    debugger
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>TESTE</Text>
        <Text>TESTE</Text>
        <Text>TESTE</Text>
        <Text onPress={() => this.zoom()}>TESTE</Text>

        <View style={{width: 200, height: 200, backgroundColor: 'black'}}>
          <Image onLayout={(event) => this.teste(event.nativeEvent)} ref="image" source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 200, height: 200}} />
        </View>

      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
