import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native'
import { FaFullButton, FaPageTitle, FaInput } from 'fa-components'
import {
  FaHeader,
  ViewContainer,
  FaButton,
} from 'fa-components'

const s = require('../../styles/core.js')

export class MeusDadosPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
    }
  }

  _isFormValid(e) {
    if (!e.isValid()) {
      this.valid = false
    }
  }


  _validar() {
    const self = this

    // alert(this.refs['txtEmail'].isValid())

    const campos = [
      this.refs.nome,
      this.refs.cpf,
      this.refs.numeracao,
      this.refs.data,
    ]

    this.valid = true

    campos.forEach((campo) => this._isFormValid(campo))

    if (self.valid) {
      alert('E foi!!')
    }

    self.setState({ showErrors: true })
  }

  render() {
    return (
      <ViewContainer>

        <FaHeader title="Meus dados" onGoBack={() => this.props.navigator.pop()} />

        <ScrollView keyboardShouldPersistTaps>

          <View style={styles.container}>

            <FaPageTitle title="Dados PESSOAIS" subTitle="Altere seus dados pessoais abaixo:" />

            <FaInput label="Nome" ref="nome" value="Alexandre Palagem" required showErrors={this.state.showErrors} />
            <FaInput label="CPF" ref="cpf" value="022.000.000-60" required showErrors={this.state.showErrors} />
            <FaInput label="Variação de numeração" ref="numeracao" required showErrors={this.state.showErrors} type={'numeric'} />
            <FaInput label="Data de nascimento" ref="data" required showErrors={this.state.showErrors} />

            <FaButton label="ENVIAR" type="secondary" onPress={() => this._validar()} />
          </View>

        </ScrollView>

      </ViewContainer>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: '$md',
    paddingBottom: '$lg',
    backgroundColor: '$colors.white1',
  },
})
