import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewContainer, FaFullButton, FaButton, FaHeader, FaInfo} from 'fa-components';

import { UserModel } from 'fa-models';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { AccountService, LoaderService, StorageService } from 'fa-services';


export class AccountPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showErrors: false,
        visible: false,
        user: new UserModel()
      }

      this._accountService = new AccountService();
  }

  componentDidMount() {

    StorageService.getObject('user')
      .then((user) => {
        if(user === null) {
          this._accountService.getInformacoesUsuario()
            .then((response) => {
              this.setState({user: response})
              StorageService.setObject('user', response);
            }).catch((error) => {
              alert('Erro ao carregar dados do usuário');
            })
        } else {
          this.setState({user})
        }

      })
  }

  _meusDadosPage() {
    this.props.navigator.push({
        name: 'meus-dados'
    });
  }

  _meusEnderecosPage() {

    LoaderService.show();

    this._accountService.getEnderecos()
    .then((response) => {

      LoaderService.hide();

      this.props.navigator.push({
          name: 'meus-enderecos',
          passProps: {
            enderecos: response
          }
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  _meusPedidosPage() {
    this.props.navigator.push({
        name: 'meus-pedidos'
    });
  }

  _logout() {

    StorageService.remove('Usertoken')
    .then((response) => {
      this.props.navigator.resetTo({name: 'auth-page'});
    })
  }

  _renderPhoto() {
    // return (
    //   <Image style={perfil.photoImage} source={{uri: 'https://scontent-gru.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/10354156_811493015580115_3639935977396716883_n.jpg?oh=9aeeee37209efc32cb88c42d4d4f5e61&oe=58687C66'}} />
    // )
  }

  render() {
    return (
      <ViewContainer>

          <FaHeader showLogo={true} onGoBack={() => this.props.navigator.pop()} />

          <ScrollView style={{flex: 1}}>

            <View style={perfil.container}>

              {this._renderPhoto()}

              <Icon name='person-pin' size={90} style={{color: '#999', marginBottom: 20, marginTop: 10}} />

              <View style={perfil.name}>
                <Text style={perfil.nameText}>Olá, {this.state.user.nome}</Text>
              </View>
            </View>

            <View style={{backgroundColor: 'white', padding: 30}}>

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <FaInfo label='E-mail' last={true} value={this.state.user.email} />
                </View>
                <View style={{flex: 1}}>
                  <FaInfo label='Celular' last={true} value={this.state.user.celular} />
                </View>
              </View>

            </View>

            <FaFullButton label='MEUS ENDEREÇOS' onPress={() => this._meusEnderecosPage()} />

          </ScrollView>

          <View style={styles.container}>
            <FaButton label='Sair' type='primary' size='md' style={{marginTop: 20}} onPress={() => this._logout() } />
          </View>

      </ViewContainer>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: '$sm'
  }
});

const perfil = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '$colors.gray2'
  },
  photoImage: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '$colors.gray2'
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '$colors.black2'
  }
});
