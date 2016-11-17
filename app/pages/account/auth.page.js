import React, { Component } from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FaInput } from 'fa-components'
import {
  LoaderService,
  AccountService,
  StorageService,
} from 'fa-services'
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar,
  Image,
  Dimensions,
  Animated,
} from 'react-native'
import {
  NavBar,
  ViewContainer,
  FaButton,
} from 'farma-lib'

let { width, height } = Dimensions.get('window')

export class AuthPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      opacity: new Animated.Value(0),
    }

    this._accountService = new AccountService()
  }


  componentDidMount() {
    Animated.timing(
       this.state.opacity,
       { toValue: 1, duration: 650 }
     ).start()

    StorageService.remove('user')
  }

  _navigateToPersonShow() {
    this.props.navigator.push({
      name: 'RegisterPage',
    })
  }

  _backToHome() {
    this.props.navigator.pop()
  }

  _novaConta() {
    this.props.navigator.push({
      name: 'RegisterPage',
    })
  }

  _loginPage() {
    this.props.navigator.push({
      name: 'login-page',
    })
  }

  _visitante() {
    LoaderService.show()

    this._accountService.createVisitante()
      .then((response) => {
        StorageService.setString('Usertoken', response.token)
        .then((response) => {
          LoaderService.hide()
          this.props.navigator.resetTo({ name: 'DashboardPage' })
        })
      })
  }

  _validar() {
    this.setState({ showErrors: true })
  }

  //
  // <FaInput label='Login' ref='txtEmail' required={true} showErrors={this.state.showErrors} type='email-address' />
  // <FaInput label='Senha' secured={true} required={true} showErrors={this.state.showErrors} />

  render() {
    return (
      <Animated.View style={{ flex: 1, opacity: this.state.opacity }}>
        <ViewContainer>

          <StatusBar barStyle="light-content" />

          <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

            <Image style={{ resizeMode: 'cover', position: 'absolute', left: 0, bottom: 0, right: 0, left: 0 }} source={require('../../assets/img/login-bg.png')} />

            <View style={{ width: 180, height: 180 }}>
              <Image style={logo.farma} source={require('../../assets/img/farma-logo-white.png')} />
            </View>

          </View>

          <View>

            <View style={{ margin: width * 0.05, padding: width * 0.05 }}>

              <FaButton label="ENTRAR" style={{ marginBottom: 20 }} type="primary" onPress={() => this._loginPage()} />
              <FaButton label="CRIAR NOVA CONTA" style={{ marginBottom: 20 }} type="secondary" onPress={() => this._novaConta()} />

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ paddingBottom: 10, paddingTop: 10 }} onPress={() => this._visitante()}>
                  <Text style={{ textDecorationLine: 'underline', color: '#555', fontSize: 15 }}>Continuar sem cadastro</Text>
                </TouchableOpacity>
              </View>


            </View>

            <KeyboardSpacer />
          </View>

        </ViewContainer>
      </Animated.View>
  ) }
}

const button = EStyleSheet.create({
  facebook: {
    backgroundColor: '#3b5998',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3b5998',
  },
  facebookText: {
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: -0.5,
  },
  primary: {
    backgroundColor: '#ff6b00',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff6b00',
  },
  primaryText: {
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: -0.5,
  },
  ternary: {
    backgroundColor: 'white',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  ternaryText: {
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: -0.5,
  },
})

const logo = EStyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 30,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  farma: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null,
  },
})

const style = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colors.white1',
  },
})
