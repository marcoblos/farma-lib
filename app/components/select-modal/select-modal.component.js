import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView
} from 'react-native';

import {
  FaRadioList,
  FaButton
} from 'fa-components';

import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/MaterialIcons';

export class FaSelectModal extends Component {
  constructor(props) {
      super(props);

      this.state = {
        data: []
      }
  }

  _renderIcon() {
    if(this.props.icon) {
      return (
        <Icon name={this.props.icon} size={20} style={info.icon} />
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    alert('adasd');
    console.log(nextProps.data);
    this.setState({data: nextProps.data});
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  _onSelected(selected) {
    console.log(this.state.data);
  }


  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={true}
        >
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end', paddingLeft: 30, paddingRight: 30}}>

        <Text style={{color: 'white'}}>Quantidade:</Text>
        <Text style={{fontWeight: 'bold', paddingBottom: 20, fontSize: 20, color: 'white'}}>02 caixas e tal...</Text>

        <View style={{paddingLeft: 10, paddingRight: 0, borderRadius: 6, marginBottom: 20, backgroundColor: 'white', height: 300}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            {this.state.data.map((item, index) => {
              return (
                <ScrollView key={index} style={{flex: 1, padding: 10}}>
                  <FaRadioList options={item.values} onSelected={(selected) => this._onSelected(selected)} />
                </ScrollView>
              )
            })}
          </View>

          </View>

          <FaButton label='Selecionar' type='primary' onPress={() => this._modalQuantidade(false)} />
          <FaButton label='Cancelar' type='link' onPress={() => this._modalQuantidade(false)} />

        </View>
      </Modal>
    );
  }
}

const info = EStyleSheet.create({
    container: {
    },
    label: {
      fontSize: 11,
      paddingBottom: 3,
      fontWeight: 'bold',
      color: '$colors.black3'
    },
    value: {
      fontSize: 14,
      color: '$colors.black1'
    },
    icon: {
      fontSize: 17,
      marginRight: 3,
      color: '$colors.black3'
    }
});
