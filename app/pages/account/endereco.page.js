import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ViewContainer, FaFullButton, FaButton, FaHeader, FaPageTitle, FaInput } from 'fa-components'
import { AccountService } from 'fa-services'


export class EnderecoPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      cep: '',
      rua: '',
      cidade: '',
      uf: '',
      numero: '',
      complemento: '',
    }

    this._accountService = new AccountService()
  }

  componentDidMount() {
    console.log(this.props.endereco)

    this.setState({
      cep: this.props.endereco.cep.toString(),
      rua: this.props.endereco.rua,
      cidade: this.props.endereco.cidade,
      uf: this.props.endereco.uf,
      numero: this.props.endereco.numero.toString(),
      complemento: this.props.endereco.complemento,
    })
  }


  _removerEndereco() {
    const data = {
      TokenIonic: '37399709-9593-45fc-9d8c-8192ebcf2255',
      IDEndereco: this.props.endereco.id,
    }

    this._accountService.removerEndereco(data)
    .then((response) => {
      debugger

      this.props.navigator.resetTo({
        name: 'DashboardPage',
      })
    })
    .catch((error) => {
      alert('Não foi possível remover o endereço. Tente novamente mais tarde.')
    })
  }

  _alertRemoverEndereco() {
    Alert.alert(
      'Excluir endereço',
      'Deseja remover o endereço do cadastro?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed!') },
        { text: 'Sim', onPress: () => this._removerEndereco() },
      ]
    )
  }

  render() {
    return (
      <ViewContainer>

        <FaHeader title="Endereço" onGoBack={() => this.props.navigator.pop()} />

        <ScrollView keyboardShouldPersistTaps>

          <View style={styles.container}>

            <FaPageTitle title="Endereço" subTitle="" />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2, paddingRight: 15 }}>
                <FaInput label="CEP" ref="cep" value={this.state.cep} onChange={(text) => this.setState({ cep: text })} required showErrors={this.state.showErrors} />
              </View>
              <View style={{ flex: 1 }} />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2, paddingRight: 15 }}>
                <FaInput label="Rua" ref="rua" value={this.state.rua} onChange={(text) => this.setState({ rua: text })} required showErrors={this.state.showErrors} />
              </View>
              <View style={{ flex: 1, paddingLeft: 15 }}>
                <FaInput label="Número" ref="numero" value={this.state.numero} onChange={(text) => this.setState({ numero: text })} required showErrors={this.state.showErrors} />
              </View>
            </View>

            <FaInput label="Cidade" ref="cidade" value={this.state.cidade} onChange={(text) => this.setState({ cidade: text })} required showErrors={this.state.showErrors} />

            <FaInput label="Estado" ref="uf" value={this.state.uf} onChange={(text) => this.setState({ uf: text })} required showErrors={this.state.showErrors} />

            <FaInput label="Complemento" ref="complemento" value={this.state.complemento} onChange={(text) => this.setState({ complemento: text })} required showErrors={this.state.showErrors} />

            <FaButton style={{ marginTop: 20 }} label="APAGAR ENDEREÇO" type="ternary" onPress={() => this._alertRemoverEndereco()} />
          </View>


        </ScrollView>

      </ViewContainer>
    )
  }
}

const perfil = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  photoImage: {
    resizeMode: 'contain',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  name: {
    paddingTop: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const styles = EStyleSheet.create({
  container: {
    padding: '$md',
    paddingBottom: '$lg',
    backgroundColor: '$colors.white1',
  },
})
