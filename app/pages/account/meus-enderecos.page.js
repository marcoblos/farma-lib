import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewContainer, FaFullButton, FaButton, FaHeader, FaPageTitle, FaInput, FaMessage} from 'fa-components';


export class MeusEnderecosPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        showErrors: false
      }
  }

  componentDidMount() {
    console.log(this.props.enderecos);
  }

  _isFormValid(e) {

    if(!e.isValid()) {
      this.valid = false;
    }

  }


  _validar() {

    let self = this;

    // alert(this.refs['txtEmail'].isValid());

    let campos = [
      this.refs['nome'],
      this.refs['cpf'],
      this.refs['numeracao'],
      this.refs['data']
    ]

    this.valid = true;

    campos.forEach((campo) => this._isFormValid(campo));

    if(self.valid) {
      alert('E foi!!');
    }

    self.setState({showErrors: true});
  }

  _enderecoDetalhePage(endereco) {
    this.props.navigator.push({
        name: 'endereco',
        passProps: {
          endereco: endereco
        }
    });
  }

  _renderPage() {

    if(this.props.enderecos.length > 0) {

      return (
        <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={true}>

          {this.props.enderecos.map((e, index) => {

            let label = [
              `${e.rua}, ${e.numero}, ${e.complemento}`,
              `${e.bairro}, ${e.cidade}`,
              `${e.cep}`,
            ]

            return (
              <FaFullButton
                key={index}
                title={e.bairro.toUpperCase()}
                label={label}
                onPress={() => this._enderecoDetalhePage(e)}
                borderBottom={true}
                padding={20} />
            )
          })}

        </ScrollView>
      )
      
    } else {

      return(
        <FaMessage icon='person-pin-circle' title='Sem endereços' text='Você não cadastrou nenhum endereço. O endereço ficará vinculado quando você finalizar um pedido.' />
      )
    }
  }

  render() {
    return (
      <ViewContainer>

          <FaHeader title='Meus endereços' onGoBack={() => this.props.navigator.pop()} />



              {this._renderPage()}



      </ViewContainer>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: '$md',
    marginBottom: '$lg',
    backgroundColor: '$colors.white1'
  }
});
