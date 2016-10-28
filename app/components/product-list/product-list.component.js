import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'

import { FaImageZoom } from 'fa-components'

import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageZoomVisible: false,
      selectedImagemZoom: '',
    }
  }

  _renderIcon() {
    if (this.props.icon) {
      return (
        <Icon name={this.props.icon} size={20} style={info.icon} />
        )
    }
  }

  _renderImagem(img, index) {
    return (
      <View key={index} style={{ position: 'relative', width: 40 }}>
        <TouchableOpacity onPress={() => this.setState({ imageZoomVisible: true, selectedImagemZoom: `https://s3-sa-east-1.amazonaws.com/farma-images/${img}` })}>
          <View style={{ paddingTop: 5, marginLeft: 5 }}>
            <Image style={{ width: 30, height: 30, resizeMode: 'cover' }} source={{ uri: `https://s3-sa-east-1.amazonaws.com/farma-images/${img}` }} />
          </View>
        </TouchableOpacity>
      </View>
      )
  }

  _renderDescricao() {
    if (this.props.product.obs) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Icon name="message" size={13} style={{ color: 'rgba(0,0,0,0.3)', marginTop: 5, marginRight: 3 }} />
          <Text style={{ flex: 1, color: 'rgba(0,0,0,0.5)', paddingTop: 3 }}>{this.props.product.obs}</Text>
        </View>
        )
    }
  }

  _renderValorFormatado() {
    if (this.props.valor > 0) {
      return (
        <Text style={{ fontWeight: 'bold' }}>{this.props.product.valorFormatado}</Text>
        )
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)', paddingBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text>{this.props.product.nome}</Text>
          {this._renderDescricao()}
          <Text style={{ color: 'rgba(0,0,0,0.6)', paddingTop: 3 }}>{`${this.props.product.quantidade} ${this.props.product.unidade}`}</Text>
        </View>

        <View style={{ width: 80, paddingRight: 0, alignItems: 'flex-end' }}>
          {this._renderValorFormatado()}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {this.props.product.imagens.map((img, index) => this._renderImagem(img, index))}
          </View>
        </View>

        <FaImageZoom
          url={this.state.selectedImagemZoom}
          visible={this.state.imageZoomVisible}
          onClose={() => this.setState({ imageZoomVisible: false })}
        />

      </View>
        )
  }
}

const info = EStyleSheet.create({
  container: {
  },
  label: {
    fontSize: 11,
    paddingBottom: 3,
    fontWeight: 'bold',
    color: '$colors.black3',
  },
  value: {
    fontSize: 14,
    color: '$colors.black1',
  },
  icon: {
    fontSize: 17,
    marginRight: 3,
    color: '$colors.black3',
  },
})
