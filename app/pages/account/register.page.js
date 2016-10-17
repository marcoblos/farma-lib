import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ViewContainer, FaHeader, FaInput, FaButton, FaPageTitle } from 'fa-components';

import EStyleSheet from 'react-native-extended-stylesheet';

import {UserModel} from 'fa-models';
import {AccountService} from 'fa-services';

import Icon from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const {height, width} = Dimensions.get('window');
const s = require('../../styles/core.js');


import CryptoJS from 'crypto-js';


export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrors: false,
      name: '',
      email: '',
      password: '',
      phone: ''
    }

    this._accountService = new AccountService();
  }


  _isFormValid(e) {

    if(!e.isValid()) {
      this.valid = false;
      this.setState({showErrors: true});
    }

  }

  _register() {

    let campos = [
      this.refs['name'],
      this.refs['email'],
      this.refs['password'],
      this.refs['phone']
    ]

    this.valid = true;
    campos.forEach((campo) => this._isFormValid(campo));

    let user = new UserModel({
      usuario: 'acp@gmail.com',
      senha: CryptoJS.MD5('farma')
    });


    this._accountService.teste(user)
      .then((response) => {
        alert('OK');
        debugger;
      }).catch((error) => {
        debugger;
      });

    return false;

    if(this.valid) {

      let user = new UserModel({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone
      });

      this._accountService.createUser(user)
        .then((response) => {
          alert('OK');
        }).catch((error) => {
          alert(error.response.data.message);
        });
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
            <FaInput label='Senha' ref='password' value={this.state.password} onChange={(text) => this.setState({password: text})} required={true} showErrors={this.state.showErrors} />
            <FaInput label='Nome' ref='name' value={this.state.name} onChange={(text) => this.setState({name: text})} required={true} showErrors={this.state.showErrors} />
            <FaInput label='Celular' ref='phone' value={this.state.phone} onChange={(text) => this.setState({phone: text})} required={true} showErrors={this.state.showErrors} type='numeric' />

            <FaButton label='FINALIZAR' style={{marginTop: 20}} size='md' type='primary' onPress={() => this._register()} />
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
