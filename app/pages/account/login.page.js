import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ViewContainer, FaHeader, FaInput, FaButton, FaPageTitle } from 'fa-components';

import EStyleSheet from 'react-native-extended-stylesheet';

import { UserModel } from 'fa-models';
import { AuthService, ToasterService, StorageService, LoaderService } from 'fa-services';

import Icon from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import * as axios from 'axios';

const {height, width} = Dimensions.get('window');
const s = require('../../styles/core.js');


import CryptoJS from 'crypto-js';


export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrors: false,
      name: '',
      email: '',
      password: '',
      phone: ''
    }

    this._authService = new AuthService();
  }


  _isFormValid(e) {

    if(!e.isValid()) {
      this.valid = false;
      this.setState({showErrors: true});
    }

  }

  _login() {
    let campos = [
      this.refs['email'],
      this.refs['password']
    ]

    this.valid = true;
    campos.forEach((campo) => this._isFormValid(campo));

    if(this.valid) {

    //   StorageService.setString('Usertoken', '37399709-9593-45fc-9d8c-8192ebcf2255')
    //  .then((response) => {
    //    this.props.navigator.resetTo({name: "DashboardPage"});
    //  })

      let data = {
        Email: this.refs['email'].getValue(),
        Senha: CryptoJS.MD5(this.refs['password'].getValue()).toString()
        // Senha: 'c16bf8658889f0e6eab224dddbd4e0dd'
      }

      this._authService.doLogin(data)
      .then((response) => {

        debugger;
        LoaderService.hide();

        let Usertoken = response.Usertoken.toString();

        axios.defaults.headers.common['Usertoken'] = Usertoken;

        StorageService.setString('Usertoken', Usertoken)
        .then((response) => {
          this.props.navigator.resetTo({name: "DashboardPage"});
        });
      }).catch((error) => {
        debugger;
      })

    }



  }


render() {
  return (
    <ViewContainer>
      <FaHeader title='Nova conta' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView keyboardShouldPersistTaps={true} style={{flex: 1}}>

        <View style={styles.container}>

          <FaPageTitle title='LOGIN' subTitle='Informe os dados de acesso para continuar' />

            <FaInput label='E-mail' ref='email' value='' required={true} showErrors={this.state.showErrors} type='email-address' />
            <FaInput label='Senha' ref='password' value='' required={true} showErrors={this.state.showErrors} />

            <FaButton label='ENTRAR' style={{marginTop: 20}} size='md' type='primary' onPress={() => this._login()} />
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
});
