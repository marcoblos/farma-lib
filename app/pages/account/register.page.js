import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native'
import { ViewContainer, FaHeader, FaInput, FaButton, FaPageTitle } from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'

import {UserModel} from 'fa-models'
import {AccountService, LoaderService, StorageService, ToasterService, AuthService} from 'fa-services'

import Icon from 'react-native-vector-icons/MaterialIcons'
import KeyboardSpacer from 'react-native-keyboard-spacer'

const {height, width} = Dimensions.get('window')
const s = require('../../styles/core.js')

import * as axios from 'axios'


import CryptoJS from 'crypto-js'


export class RegisterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      name: '',
      email: '',
      password: '',
      phone: ''
    }

    this._authService = new AuthService()
    this._accountService = new AccountService()
  }


  _isFormValid(e) {

    if(!e.isValid()) {
      this.valid = false
      this.setState({showErrors: true})
    }

  }

  _register() {

    let campos = [
      this.refs['name'],
      this.refs['email'],
      this.refs['password'],
      this.refs['phone']
    ]

    this.valid = true
    campos.forEach((campo) => this._isFormValid(campo))

    if(this.valid) {

      let user = {
        Nome: this.refs['name'].getValue(),
        Email: this.refs['email'].getValue(),
        Senha: CryptoJS.MD5(this.refs['password'].getValue()).toString(),
        Celular: this.refs['phone'].getValue(),
        CEP: ''
      }

      LoaderService.show()

      this._accountService.createUser(user)
        .then((response) => {

          if(response.status) {

            let data = {
              Email: this.refs['email'].getValue(),
              Senha: CryptoJS.MD5(this.refs['password'].getValue()).toString()
            }

            this._authService.doLogin(data)
            .then((response) => {

              if(response.result === false) {
                LoaderService.hide()

                setTimeout( function() {
                  LoaderService.hide()
                  ToasterService.error(response.msg)
                }, 500)

              }

              let Usertoken = response.Usertoken.toString()
              axios.defaults.headers.common['Usertoken'] = Usertoken
              StorageService.setString('Usertoken', Usertoken)
              .then((response) => {
                LoaderService.hide()
                this.props.navigator.resetTo({name: "DashboardPage"})
              })
            }).catch((error) => {
              console.error(error);
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
      <FaHeader title='Nova conta' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView keyboardShouldPersistTaps={true} style={{flex: 1}}>

        <View style={styles.container}>

          <FaPageTitle title='Nova conta' subTitle='Informe seus dados para criar uma nova conta' />

            <FaInput label='E-mail' ref='email' value={this.state.email} onChange={(text) => this.setState({email: text})} required={true} showErrors={this.state.showErrors} type='email-address' />
            <FaInput label='Senha' ref='password' password={true} value={this.state.password} onChange={(text) => this.setState({password: text})} required={true} showErrors={this.state.showErrors} />
            <FaInput label='Nome' ref='name' value={this.state.name} onChange={(text) => this.setState({name: text})} required={true} showErrors={this.state.showErrors} />
            <FaInput label='Celular' ref='phone' mask={{type: 'cel-phone'}} value={this.state.phone} onChange={(text) => this.setState({phone: text})} required={true} showErrors={this.state.showErrors} type='numeric' />

            <FaButton label='CADASTRAR' style={{marginTop: 20}} size='md' type='primary' onPress={() => this._register()} />
        </View>

        <KeyboardSpacer/>

      </ScrollView>

    </ViewContainer>
  )}
}

const styles = EStyleSheet.create({
  container: {
    padding: '$md',
    paddingBottom: '$lg',
    backgroundColor: '$colors.white1'
  }
})
