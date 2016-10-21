import React, { Component } from 'react'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'


import {FaInput} from 'fa-components'


export class PocPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cep: '',
      showErrors: false
    }

  }

  atualiza(t) {
    this.setState({cep: t})
  }


  _salvar() {
    this.setState({showErrors: true})
  }

  render() {
    return (
      <View style={styles.container}>


        <FaInput label='CEP' ref='cep' mask='cpf' value='' required={true} showErrors={this.state.showErrors} type='numeric' />
        <FaInput label='CEP' ref='cep' value='' required={true} showErrors={this.state.showErrors} type='numeric' />


         <TouchableHighlight onPress={() => this._salvar()}><Text>[SALVAR]</Text></TouchableHighlight>


      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  }
})
