import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export class FaPageTitle extends Component {
    constructor(props) {
        super(props);
    }

    _renderTitle() {
      if(this.props.title) {
        return (
          <Text style={[
              pageTitle.title,
              this.props.highlight ? pageTitle.highlight : {},
              this.props.theme === 'white' ? {color: 'rgba(255,255,255,0.9)'} : {}
            ]}>{this.props.title.toUpperCase()}</Text>
        )
      }
    }

    _renderSubTitle() {
      if(this.props.subTitle) {
        return (
          <Text style={[pageTitle.subTitle, this.props.theme === 'white' ? {color: 'rgba(255,255,255,0.8)'} : {}]}>{this.props.subTitle}</Text>
        )
      }
    }

    render() {
        return (
            <View style={[
                  pageTitle.container,
                  this.props.style,
                  this.props.paddingBottom === false ? {paddingBottom: 0} : {},
                  this.props.paddingBottom > 0 ? {paddingBottom: this.props.paddingBottom} : {},
                  this.props.paddingRight === false ? {paddingRight: 0} : {},
                  this.props.paddingLeft === false ? {paddingLeft: 0} : {},
                  this.props.paddingTop === false ? {paddingTop: 0} : {}
                ]}>
                {this._renderTitle()}
                {this._renderSubTitle()}
            </View>
        );
    }
}

const pageTitle = EStyleSheet.create({
    container: {
      paddingBottom: '$lg'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '$colors.black2'
    },
    subTitle: {
      fontSize: 14,
      paddingTop: 3,
      color: '$colors.black3'
    },
    highlight: {
      color: '$colors.secondary'
    }
});
