import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions, Modal } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FaFullButton, FaModalHeader, FaProduct, FaInfo, FaInput, FaPageTitle, FaMessage } from 'fa-components'

import {
  NavBar,
  ViewContainer,
  FaButton,
} from 'fa-components'

const window = Dimensions.get('window')

import Icon from 'react-native-vector-icons/MaterialIcons'

import KeyboardSpacer from 'react-native-keyboard-spacer'

import Swiper from 'react-native-swiper'


const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10,
    }}
    >
      <Text>
        <Text style={{
          color: '#007aff',
          fontSize: 20,
        }}
        >{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export class CotacoesEntregaPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrors: false,
      visible: false,
      page: 0,
      modalVisible: false,
    }
  }

  _meusDadosPage() {
    this.props.navigator.push({
      name: 'meus-dados',
    })
  }

  _meusEnderecosPage() {
    this.props.navigator.push({
      name: 'meus-enderecos',
    })
  }

  _meusPedidosPage() {
    this.props.navigator.push({
      name: 'meus-pedidos',
    })
  }

  _logout() {
    this.props.navigator.resetTo({
      name: 'login-page',
    })
  }

  _renderPhoto() {
    // return (
    //   <Image style={perfil.photoImage} source={{uri: 'https://scontent-gru.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/10354156_811493015580115_3639935977396716883_n.jpg?oh=9aeeee37209efc32cb88c42d4d4f5e61&oe=58687C66'}} />
    // )
  }

  onMomentumScrollEnd(e, state, context) {
    this.setState({ page: context.state.index })
    console.log(context.state.index)
  }

  _renderInfo() {
    if (this.state.page === 0) {
      return (
        <View style={[{ padding: 20 }]}>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Paracetamol</Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 29,90</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Fralda <Text style={{ color: '#999' }}>Pampers tamanho G</Text></Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 12,32</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text>Dorflex</Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View>
              <Icon name="photo-camera" style={{ color: '#999' }} size={20} />
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 9,50</Text>
            </View>
          </View>
        </View>
      )
    }

    if (this.state.page === 1) {
      return (
        <View style={[{ padding: 20 }]}>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Paracetamol</Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 27,40</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text>Fralda <Text style={{ color: '#999' }}>Pampers tamanho G</Text></Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 8,15</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text>Dorflex</Text>
              <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
            </View>
            <View>
              <Icon name="photo-camera" style={{ color: '#999' }} size={20} />
            </View>
            <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>R$ 12,22</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title="Pedido nº 29" onGoBack={() => this.props.navigator.pop()} />


        <ScrollView>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15, backgroundColor: '#6ad776' }}>
            <Icon name="motorcycle" style={{ fontSize: 45, color: 'rgba(255,255,255,0.7)' }} />
            <View style={{ flex: 1, padding: 15, paddingTop: 20, paddingBottom: 20, color: 'white' }}>
              <Text style={{ color: 'white' }}>Entrega em andamento!</Text>
              <Text style={{ color: 'white' }}>Em breve chegará ao destino.</Text>
            </View>
          </View>


          <View style={{ backgroundColor: 'white', padding: 20 }}>

            <FaPageTitle paddingBottom={20} title="Pedido nº 29" subTitle="Saiu para entrega." />

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="event" label="Data do pedido" value="30/10/2016" />
              </View>
              <View style={{ flex: 1 }}>
                <FaInfo icon="access-time" label="Horário" value="22:10" />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="store" label="Farmácia" value="Agafarma" />
              </View>
              <View style={{ flex: 1 }}>
                <FaInfo label="Tele" value="R$ 2,90" />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <FaInfo icon="access-time" last label="Tempo de entrega" value="0h 30min" />
              </View>

              <View style={{ flex: 1 }}>
                <FaInfo label="Total" last value="R$ 12,90" />
              </View>
            </View>


            <View>

              <View style={{ paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginTop: 40, marginBottom: 20 }}>
                <Text style={{ color: '#999', fontWeight: 'bold' }}>PRODUTOS</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text>Paracetamol</Text>
                  <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
                </View>
                <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 'bold' }}>R$ 12,22</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text>Fralda <Text style={{ color: '#999' }}>Pampers tamanho G</Text></Text>
                  <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
                </View>
                <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 'bold' }}>R$ 12,22</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text>Dorflex</Text>
                  <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>02 Caixas</Text>
                </View>
                <View>
                  <Icon name="photo-camera" style={{ color: '#999' }} size={20} />
                </View>
                <View style={{ width: 90, paddingRight: 15, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 'bold' }}>R$ 12,22</Text>
                </View>
              </View>

              <View style={{ paddingTop: 30 }}>
                <FaButton label="PEDIDO ENTREGUE" type="success" size="md" onPress={() => this.setModalVisible(true)} />
              </View>
            </View>

          </View>
        </ScrollView>

        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>

            <FaModalHeader title="Detalhe da cotação" onClose={() => this.setModalVisible(false)} />

            <ScrollView keyboardShouldPersistTaps>

              <View style={{ backgroundColor: 'white', padding: 20, paddingBottom: 50 }}>

                <FaPageTitle title="Complete os dados" paddingBottom={30} subTitle="Complete as informações para aceitar a cotação." />

                <FaInput label="Troco para quanto?" ref="nome" value="" required showErrors={this.state.showErrors} />
                <FaInput label="Quem vai receber?" ref="nome" value="" required showErrors={this.state.showErrors} />
                <FaInput label="Celular" ref="nome" value="" required showErrors={this.state.showErrors} />

                <View style={{ paddingTop: 30 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                      <FaInfo icon="store" label="Farmácia" value="Agafarma" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FaInfo label="Tele" value="R$ 2,90" />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                      <FaInfo icon="access-time" last label="Tempo de entrega" value="0h 30min" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <FaInfo label="Total" last value="R$ 12,90" />
                    </View>
                  </View>
                </View>

              </View>


            </ScrollView>

            <View style={{ padding: 12 }}>
              <FaButton label="ACEITAR" type="primary" onPress={() => this._validar()} />
            </View>

            <KeyboardSpacer />


          </View>

        </Modal>

      </ViewContainer>
    )
  }
}


const styles = EStyleSheet.create({
  headerTop: {
    backgroundColor: '#80be5d',
    height: 200,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: -1,
  },
  header: {
    paddingBottom: 20,
    marginBottom: -140,
    zIndex: 10,
  },

  wrapper: {
  },
  slide: {
    padding: 25,
    backgroundColor: '#f3f3f3',
    flex: 1,
    margin: 20,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 6,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '$colors.gray2',
    overflow: 'hidden',
  },
  slide1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },


  container: {
    padding: '$sm',
  },
})

const perfil = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '$colors.gray2',
  },
  photoImage: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '$colors.gray2',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '$colors.black2',
  },
})
