import React, { Component } from 'react'
import {
  ScrollView,
  Image,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer, FaButton, FaCamera } from 'farma-lib'

const Permissions = require('react-native-permissions')


export class CameraPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cameraVisible: false,
      foto: '',
      photoPermission: false,
    }
  }

  _onPhoto(foto) {
    debugger
    this.setState({foto})
  }

  _renderFoto() {
    if(this.state.foto) {
      return (
        <Image style={{width: 180, height: 250}} source={{uri: this.state.foto}} />
      )
    }
  }

  _abrirCamera() {

    Permissions.requestPermission('photo')
      .then(response => {
        this.setState({ photoPermission: response })
      });

    this.setState({cameraVisible: true})
  }

  _onCloseCamera() {
    this.setState({cameraVisible: false})
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='CameraView' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>

          <FaButton label='Tirar foto' onPress={() => this._abrirCamera()} />

          <FaCamera visible={this.state.cameraVisible} getPhoto={(foto) => this._onPhoto(foto)} onClose={() => this._onCloseCamera()} />

          {this._renderFoto()}

        </BoxView>

        <BoxView padding='sm'>
          <Info label='IMPORTANTE!' value='Adicionar as permissões para IOS.' />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
