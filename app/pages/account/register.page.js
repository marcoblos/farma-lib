import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialIcons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as axios from 'axios'
import CryptoJS from 'crypto-js'
import { UserModel } from 'fa-models'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  AccountService,
  LoaderService,
  StorageService,
  ToasterService,
  AuthService,
} from 'fa-services'
import {
  FaInput,
  FaPageTitle,
} from 'fa-components'
import {
  NavBar,
  ViewContainer,
  FaButton,
} from 'fa-components'

const { height, width } = Dimensions.get('window')
const s = require('../../styles/core.js')

export class RegisterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      name: '',
      email: '',
      password: '',
      phone: '',
    }

    this._authService = new AuthService()
    this._accountService = new AccountService()
  }


  _isFormValid(e) {
    if (!e.isValid()) {
      this.valid = false
      this.setState({ showErrors: true })
    }
  }

  _register() {
    const campos = [
      this.refs.name,
      this.refs.email,
      this.refs.password,
      this.refs.phone,
    ]

    this.valid = true
    campos.forEach((campo) => this._isFormValid(campo))

    if (this.valid) {
      const user = {
        Nome: this.refs.name.getValue(),
        Email: this.refs.email.getValue(),
        Senha: CryptoJS.MD5(this.refs.password.getValue()).toString(),
        Celular: this.refs.phone.getValue(),
        CEP: '',
      }

      LoaderService.show()

      this._accountService.createUser(user)
        .then((response) => {
          if (response.status) {
            const data = {
              Email: this.refs.email.getValue(),
              Senha: CryptoJS.MD5(this.refs.password.getValue()).toString(),
            }

            this._authService.doLogin(data)
            .then((response) => {
              if (response.result === false) {
                LoaderService.hide()

                setTimeout(() => {
                  LoaderService.hide()
                  ToasterService.error(response.msg)
                }, 500)
              }

              const Usertoken = response.Usertoken.toString()
              axios.defaults.headers.common.Usertoken = Usertoken
              StorageService.setString('Usertoken', Usertoken)
              .then((response) => {
                LoaderService.hide()
                this.props.navigator.resetTo({ name: 'DashboardPage' })
              })
            }).catch((error) => {
              console.error(error)
            })
          } else {
            LoaderService.hide()
            ToasterService.error(response.resultado)
          }
        })
    }
  }

  render() {
    return (
      <ViewContainer>
        <NavBar title="Nova conta" onGoBack={() => this.props.navigator.pop()} />

        <ScrollView keyboardShouldPersistTaps style={{ flex: 1 }}>

          <View style={styles.container}>

            <FaPageTitle title="Nova conta" subTitle="Informe seus dados para criar uma nova conta" />

            <FaInput label="E-mail" ref="email" value={this.state.email} onChange={(text) => this.setState({ email: text })} required showErrors={this.state.showErrors} type="email-address" />
            <FaInput label="Senha" ref="password" password value={this.state.password} onChange={(text) => this.setState({ password: text })} required showErrors={this.state.showErrors} />
            <FaInput label="Nome" ref="name" value={this.state.name} onChange={(text) => this.setState({ name: text })} required showErrors={this.state.showErrors} />
            <FaInput label="Celular" ref="phone" mask={{ type: 'cel-phone' }} value={this.state.phone} onChange={(text) => this.setState({ phone: text })} required showErrors={this.state.showErrors} type="numeric" />

            <FaButton label="CADASTRAR" style={{ marginTop: 20 }} size="md" type="primary" onPress={() => this._register()} />
          </View>

          <KeyboardSpacer />

        </ScrollView>

      </ViewContainer>
  ) }
}

const styles = EStyleSheet.create({
  container: {
    padding: '$md',
    paddingBottom: '$lg',
    backgroundColor: '$colors.white1',
  },
})
