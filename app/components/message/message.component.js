import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/MaterialIcons';

export class FaMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={empty.container}>
            <View style={empty.header}>
              <Icon style={empty.headerIcon} name={this.props.icon} size={this.props.iconSize || 120} />
            </View>
            <View style={empty.footer}>
              <Text style={empty.title}>{this.props.title.toUpperCase()}</Text>
              <Text style={empty.text}>{this.props.text}</Text>
            </View>
          </View>
        );
    }
}

const empty = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'relative'
  },
  headerNum: {
    position: 'absolute',
    top: -25,
    right: -25,
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: '$colors.secondary',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerNumText: {
    color: '$colors.white1',
    fontSize: 26,
    fontWeight: 'bold'
  },
  headerIcon: {
    color: 'rgba(0,0,0,0.2)'
  },
  footer: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    width: 290
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  text: {
    fontSize: 15,
    paddingTop: 16,
    textAlign: 'center'
  }
});
