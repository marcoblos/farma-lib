import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView, PixelRatio, Platform, Image, Modal, Dimensions } from 'react-native'
import { FaRadioList } from 'fa-components'

import {
  NavBar,
  ViewContainer,
} from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'

import * as Progress from 'react-native-progress'


import Icon from 'react-native-vector-icons/MaterialIcons'

import ImageZoom from 'react-native-transformable-image'

import Lightbox from 'react-native-lightbox'


import PhotoView from 'react-native-photo-view'


import { RNS3 } from 'react-native-aws3'


import ImagePicker from 'react-native-image-picker'

let { height, width } = Dimensions.get('window')

export class PocPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: null,
      videoSource: null,
      showProgressBar: false,
      progress: 0,
      photos: [{ uri: 'teste', name: 'opa', type: 'texto' }],
      modalVisible: false,
      selectedImage: '',
    }
  }

  teste(e) {
    this.setState({ progress: e.loaded / e.total })
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  uploadePhoto(file) {
    const self = this
    const options = {
      bucket: 'farma-images',
      accessKey: 'AKIAJZXIXLFJVNT6GDTQ',
      secretKey: '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',
      region: 'sa-east-1',
      successActionStatus: 201,
    }

    this.setState({ showProgressBar: true })


    const aa = {
      uri: 'data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACiklEQVQ4T6WSX2hScRTHjzQVHza08oItxCcdpoiBljCf9jLYSyTeKF9CnAk+XNhL4kTm4Ip7SMaSxWQjBCnRKKV8TfayK0ljYDoYiMSG/3Da0DF0eI37C0Vp66Xz8ru/c77n8zt/Lgv+01jX5RMEIe71es9omqYB4P3m5ubxVdq/AF6v9zGHw/Hs7+/fq1QqKC4SifoqlepHt9tddrlcn0dBYwCSJFflcvlLqVTKoSgKotEo0uI4DjqdDvL5fOfw8NDrdrtXB5AhwOFwPJ2cnAwZDAa2UCgEFosFuVwOmA6USiX0+32o1WqQSCQuW63WE5IkPzGQIQDH8Wa9XuevrKyAQqFAD7RaLZQ4NTWF7tlsFjweD2AYdhqJRG4PAVarVVwsFn/2ej2Ym5sDi8WCKgiHw+g0mUwIFAwGIZVKwcTEBEgkkjvBYLCMKlhaWnqezWbfisViIAgCuFwuBAIB1AJjKpUKbDYbnJ+fw/r6OpRKJZDL5aaNjY13COB2uw0KheKDVqsdluv3+2Fvbw8B9Ho9AjN2dnYG6XQaDg4OHq2trSUQwGazYbOzs8c6nY4jEAiQkNlCKBRCLZjNZtBoNMjfaDQY8MXu7u7dnZ2dxnCIPp/vu1qtvs/Mgel3ZmYGBrBmswnFYhHYbDbaCkVR35xO54OxLbhcrvlqtfqlUCjcYAIkSYJMJkOvHh0dgdPpRN9SqfSSz+fP+3y+r2MA5rK4uPjm5OTkRafTYS0sLIDRaERJsVgMkskkM9z+9PT06+3t7T8DGf0PBg673Y632+1XarX6llKp5DH+TCZzkc/nT3k8HrG1tfVxoL0SMAgajcabGIY9pGm6Xy6XqXg8/ms08doKrhL9y/cbmdcIIKku5lQAAAAASUVORK5CYII=',
      name: `img${Math.floor((Math.random() * 1000) + 1)}.png`,
      type: 'image/png',
    }

    const a = this.state.photos

    a.push(aa)


    RNS3.put(aa, options).then((response) => {
      if (response.status !== 201) {
        throw new Error('Failed to upload image to S3', response)
      }
      setTimeout(() => {
        self.setState({ showProgressBar: false })
      }, 1000)

      self.setState({ photos: a })
    }).progress((e) => this.teste(e))
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 760,
      maxHeight: 760,
      storageOptions: {
        skipBackup: true,
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else {
        let source

        const file = {
          uri: `data:image/jpegbase64,${response.data}`,
          name: `img${Math.floor((Math.random() * 1000) + 1)}.png`,
          type: 'image/jpeg',
        }

        // You can display the image using either:
        // source = {uri: 'data:image/jpegbase64,' + response.data, isStatic: true}

        // Or:
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true }
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true }
        }

        this.uploadePhoto(file)

        this.setState({
          avatarSource: source,
        })
      }
    })
  }

  selecionarImagem(foto) {
    this.setState({ selectedImage: foto })
    this.setState({ modalVisible: true })
  }


  renderFotos() {
    return (
      <View>
        {this.state.photos.map((foto, index) => {
          return (

            <TouchableOpacity onPress={() => this.selecionarImagem(foto.uri)} style={{ width: 120, height: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
              <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={{ uri: foto.uri }} />
            </TouchableOpacity>
            )
        })}
      </View>
    )
  }

  render() {
    return (
      <ViewContainer>
        <NavBar title="POC" hideBackButton style={{ marginBottom: 50 }} />

        <View style={styles.container}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
              <Text>Select a Photo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.uploadePhoto('ok')}>
            <View style={[styles.avatar, styles.avatarContainer]}>
              <Text>ENVIAR FOTO!</Text>
            </View>
          </TouchableOpacity>

          <View style={[{ padding: 20 }, this.state.showProgressBar ? { opacity: 1 } : { opacity: 0 }]}>
            <Progress.Bar progress={this.state.progress} width={200} />
          </View>

          { this.state.videoSource &&
          <Text style={{ margin: 8, textAlign: 'center' }}>{this.state.videoSource}</Text>
        }
        </View>

        {this.renderFotos()}


        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <Text>Abrir modal</Text>
        </TouchableOpacity>


        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center' }}>

            <ImageZoom
              style={{ width, height, backgroundColor: 'red' }}
              source={{ uri: 'https://raw.githubusercontent.com/yoaicom/resources/master/images/game_of_thrones_1.jpg' }}
            />

          </View>

        </Modal>


      </ViewContainer>
  ) }
}

const aa = EStyleSheet.create({
  row: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '$colors.gray1',
    height: 55,
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.7)',
    paddingBottom: 2,
  },
  value: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.9)',
  },
  icon: {
    width: 50,
    flexDirection: 'column',
  },
  iconContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
})
