import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  ScrollView,
} from 'react-native'

import {
  FaRadioList,
  FaButton,
} from 'farma-lib'

import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaSelectModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      visible: false,
      selectedValue: ''
    }
  }

  _renderIcon() {
    if (this.props.icon) {
      return (
        <Icon name={this.props.icon} size={20} style={info.icon} />
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  componentDidMount() {
    this.setState({visible: this.props.visible});
  }

  _onSelected(selected) {
    this.setState({selectedValue: selected});
  }

  _onSelect() {
    this.props.onSelect(this.state.selectedValue);
  }

  _onCancel() {
    this.props.onCancel();
  }


  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.visible}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', paddingLeft: 30, paddingRight: 30 }}>

          <Text style={{ color: 'white', fontSize: 16, paddingBottom: 20 }}>{this.props.label}</Text>

          <View style={{ padding: 8, borderRadius: 6, marginBottom: 20, backgroundColor: 'white', height: 290 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                <FaRadioList options={this.props.options} selected={this.state.selectedValue} onSelected={(selected) => this._onSelected(selected)} />
              </ScrollView>
            </View>

          </View>

          <FaButton label="Selecionar" type="primary" onPress={() => this._onSelect()} />
          <FaButton label="Cancelar" style={{marginTop: 5, marginBottom: 10}} type="link" onPress={() => this._onCancel()} />

        </View>
      </Modal>
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
    color: '$colors.scale4',
  },
  value: {
    fontSize: 14,
    color: '$colors.black',
  },
  icon: {
    fontSize: 17,
    marginRight: 3,
    color: '$colors.scale4',
  },
})
