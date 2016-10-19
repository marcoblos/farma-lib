import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/MaterialIcons';

export class FaInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
          nome: 'Nome'
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
      debugger;
    }

    render() {
        return (
            <View style={[
                info.container, this.props.style,
                this.props.last ? {marginBottom: 0} : { marginBottom: 22}
              ]}>
              <Text style={info.label}>{this.props.label.toUpperCase()}</Text>
              <View style={{flexDirection: 'row'}}>
                {this._renderIcon()}
                <Text style={[info.value, this.props.valueStyle]}>
                  {this.state.nome}
                </Text>
              </View>
            </View>
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
