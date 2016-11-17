import React, { Component } from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import EStyleSheet from 'react-native-extended-stylesheet'
import { PedidoService } from 'fa-services'
import { PedidoModel } from 'fa-models'
import { 
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'
import {
  NavBar,
  ViewContainer,
} from 'farma-lib'

const DismissKeyboard = require('dismissKeyboard')

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
})

export class PedidoBuscar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      productsDataSource: ds.cloneWithRows([]),
      text: '',
      currentProduct: {},
      isLoading: false,
      pedido: new PedidoModel(),
    }
  }

  componentDidMount() {
    const self = this

    if (this.props.pedido) {
      this.setState({ pedido: this.props.pedido })
    }

    setTimeout(() => {
      self.refs.input.focus()
    }, 500)
  }

  _buscar(el) {
    const self = this

    clearTimeout(global.__waitTimer)

    global.__waitTimer = setTimeout(() => {
      if (el.text.length > 2) {
        const pedidoService = new PedidoService()

        self.setState({
          text: el.text,
          isLoading: true,
        })

        pedidoService.getProducts(el.text)
            .then((res) => {
              const d = res
              d.unshift({ IDMedicamento: 0, N: el.text })

              self.setState({
                productsDataSource: ds.cloneWithRows(d),
                isLoading: false,
              })
            })
            .catch((error) => {
              console.error(error)
            })
      }
    }, 500)
  }

  selectProduct(nome) {
    const self = this

    DismissKeyboard()

    const product = {
      nome,
      aceitaSimilares: false,
      aceitaGenericos: false,
      descricao: '',
      quantidade: '',
      fotos: '',
    }

    self.props.navigator.push({
      name: 'DetalhePage',
      passProps: {
        pedido: this.state.pedido,
        nome,
      },
    })
  }

  _back() {
    const self = this

    DismissKeyboard()

    setTimeout(() => {
      self.props.navigator.push({
        name: route,
        currentProduct: product,
      })
    }, 500)
  }

  render() {
    return (
      <ViewContainer style={{ backgroundColor: 'white' }}>

        <NavBar title="Selecionar produto" onGoBack={() => this.props.navigator.pop()} />

        <View style={buscar.container}>
          <TextInput
            ref="input"
            style={buscar.input}
            autoCorrect={false}
            autoCapitalize={'none'}
            placeholder="Digite o nome do produto"
            onChangeText={(text) => this._buscar({ text })}
            underlineColorAndroid={'transparent'}
          />
        </View>

        <View style={[buscar.loader, this.state.isLoading ? buscar.loaderActive : {}]}>
          <ActivityIndicator size="large" />
        </View>

        <ListView
          keyboardShouldPersistTaps
          dataSource={this.state.productsDataSource}
          style={[this.state.isLoading ? { top: -900 } : {}]}
          renderRow={
                       (rowData) => (
                         <TouchableOpacity onPress={() => this.selectProduct(rowData.N)} style={poc.row}>
                           <Text>{rowData.N}</Text>
                         </TouchableOpacity>
                       )
                    }
        />
        <KeyboardSpacer />

      </ViewContainer>
        )
  }
}


const buscar = EStyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: '$colors.gray1',
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: '$radius',
    fontSize: 14,
  },
  loader: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  loaderActive: {
    top: 130,
  },
})


const poc = EStyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderColor: '$colors.gray1',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
})
