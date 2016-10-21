import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    InteractionManager,
    Animated
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { ToasterService } from 'fa-services'

const TOASTER_TIME = 4000
const TOASTER_HEIGHT = 75
const BREAKING_LINE_TEXT_LENGTH = 40


export class FaToaster extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            message: '',
            type: ''
        }

        this._top = new Animated.Value(-TOASTER_HEIGHT)

        ToasterService.registerListener((data) => this._onRequestMessage(data))
    }

    _onRequestMessage(data) {
        let self = this

        InteractionManager.runAfterInteractions(() => {
            self.setState({
                visible: true,
                message: data.message,
                type: data.type
            }, () => self._show())
        })
    }

    _renderIcon() {
        return (
            <Icon name={this.state.type === 'ERROR' ? 'close' : 'check' }
                    size={20} style={style.icon} />
        )
    }

    _show() {
        let self = this

        Animated.timing(
            this._top,
            { toValue: 0, duration: 300}
        ).start()

        setTimeout(function() {
            self._hide()
        }, TOASTER_TIME)
    }

    _hide() {
        Animated.timing(
            this._top,
            { toValue: -TOASTER_HEIGHT, duration: 200 }
        ).start()
    }

    render() {
        return (
            <Animated.View style={[style.container,
                          this.state.type === 'ERROR' ? style.container_error : style.container_success,
                          {top: this._top} ]}>
                <View style={style.content}>
                    <View style={[style.message]}>
                      <Text style={[style.message_text]}>
                          {this.state.message}
                      </Text>
                    </View>
                </View>

            </Animated.View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: TOASTER_HEIGHT,
        width: '100%',
        paddingTop: '$sizes.statusPadding',
        zIndex: 2000
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_success: {
        backgroundColor: '#777'
    },
    container_error: {
        backgroundColor: 'red'
    },
    icon: {
        color: '$colors.white1',
        marginRight: 10
    },
    message: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    message_text: {
        fontSize: 14,
        color: '$colors.white1'
    }
})
