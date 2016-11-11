import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as axios from 'axios'
import CryptoJS from 'crypto-js'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import {
  AuthService,
  StorageService,
  LoaderService,
  AccountService,
  ToasterService,
} from 'fa-services'
import {
  FaInput,
  FaPageTitle,
 } from 'fa-components'
import {
  FaHeader,
  ViewContainer,
  FaButton,
} from 'fa-components'

export class LoginPage extends Component {
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

  _vincularTokenDeviceComTokenUsuario(userToken) {
    StorageService.getString('Devicetoken').then((DeviceToken) => {
      const data = {
        Usertoken: userToken,
        Devicetoken: DeviceToken,
      }
      this._accountService.vincularDevice(data).then((response) => {
        LoaderService.hide()
      }, (error) => {
        LoaderService.hide()
      })
    })
  }

  _login() {
    const campos = [
      this.refs.email,
      this.refs.password,
    ]

    this.valid = true
    campos.forEach((campo) => this._isFormValid(campo))

    if (this.valid) {
      const data = {
        Email: this.refs.email.getValue(),
        Senha: CryptoJS.MD5(this.refs.password.getValue()).toString(),
      }

      LoaderService.show()

      this._authService.doLogin(data)
      .then((response) => {
        if (response.result === false) {
          LoaderService.hide()

          setTimeout(() => {
            ToasterService.error(response.msg)
          }, 500)
        }

        const Usertoken = response.Usertoken.toString()
        axios.defaults.headers.common.Usertoken = Usertoken
        StorageService.setString('Usertoken', Usertoken)
        .then((response) => {
          LoaderService.hide()
          this.props.navigator.resetTo({ name: 'DashboardPage' })
          // this._vincularTokenDeviceComTokenUsuario(Usertoken)
        })
      }).catch((error) => {

      })
    }
  }

  render() {
    return (
      <ViewContainer>
        <FaHeader title="Nova conta" onGoBack={() => this.props.navigator.pop()} />

        <ScrollView keyboardShouldPersistTaps style={{ flex: 1 }}>

          <View style={styles.container}>

            <FaPageTitle title="LOGIN" subTitle="Informe os dados de acesso para continuar" />

            <FaInput label="E-mail" ref="email" value="" required showErrors={this.state.showErrors} type="email-address" />
            <FaInput label="Senha" ref="password" value="" password required showErrors={this.state.showErrors} />

            <FaButton label="ENTRAR" style={{ marginTop: 20 }} size="md" type="primary" onPress={() => this._login()} />
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
