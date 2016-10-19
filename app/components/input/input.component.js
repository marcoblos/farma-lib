import React, { Component } from 'react';
import { Text, View, TextInput, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TextInputMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

export class FaInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actived: false,
            height: new Animated.Value(25),
            text: '',
            valid: true,
            showErrors: false,
            showMessage: false,
            message: '',
            showPassword: false,
            passwordText: 'mostrar'
        }

        this.errors = {
            required: {
                error: false,
                message: 'Campo obrigatório'
            },
            email: {
                error: false,
                message: 'E-mail inválido'
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showErrors: nextProps.showErrors,
            text: nextProps.value,
            required: nextProps.required
        })

        if (nextProps.showErrors) {
            this._validate()
        }

        if (nextProps.value) {
            this.setState({ height: new Animated.Value(36) });
        }
    }

    componentDidMount() {
        var self = this;

        if (self.props.required) {
            self.setState({ valid: false });
        }

        if (this.props.value) {
            this.setState({ height: new Animated.Value(36), text: this.props.value });
        }
    }

    _getTextInputComponent() {
        if(this.props.mask) {
            return this.refs['campo'].getElement();
        }
        else {
            return this.refs['campo'];
        }
    }

    _activeGroup() {
        this.setState({ actived: true, showErrors: false, showMessage: false });
        this.focus();

        Animated.timing(
            this.state.height,
            { toValue: 36, duration: 250 }
        ).start();
    }

    _blur() {

        let valid = this.isValid();

        this.setState({ valid, actived: false });

        if (this.state.text.length === 0) {
            Animated.timing(
                this.state.height,
                { toValue: 25, duration: 250 }
            ).start();
        }

    }

    _change(campo) {
        this.setState({ text: campo.text });
        this.setState({ showErrors: false });
        if(this.props.onChangeText){
            this.props.onChangeText(campo.text);
        }
    }

    _onSubmitEditing(event) {
        if(this.props.onSubmitEditing){
            this.props.onSubmitEditing(event);
        }
    }

    _validate() {

        if (!this.isValid()) {
            this.setState({ showErrors: true });
            this.setState({ showMessage: true });
        }

        let validations = [
            this._validateRequired.bind(this),
            this._validateEmail.bind(this)
        ];

        validations.forEach((v) => v());
    }

    _validateRequired() {

        if (this.props.required && this.state.text.length === 0) {
            this.errors.required.error = true;
            this.setState({ message: this.errors.required.message });
            return false;
        }
    }

    _validateEmail() {

        let isBlank = this.state.text.length === 0;
        let emailValid = this._isEmailValid(this.state.text);

        if (this.props.type === 'email-address' && !isBlank) {
            this.errors.email.error = true;
            this.setState({ message: this.errors.email.message });
            return false;
        }
    }

    _isEmailValid(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _renderMessage() {

        if (!this.state.showMessage) {
            return false
        }

        return (
            <View style={{ position: 'absolute', left: 0, bottom: 0, flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                <TouchableWithoutFeedback onPress={() => this._activeGroup() } style={[
                    !this.state.showMessage ? { opacity: 0 } : {},
                    { backgroundColor: 'green' }
                ]}>
                    <Animated.View style={[input.messageWrapper, { height: this.state.height }]}>
                        <Text style={input.message}>{this.state.message}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }


    isValid() {
        let type = this.props.type;
        let isEmailValid = this._isEmailValid(this.state.text);

        if (this.props.required && this.state.text.length === 0) {
            return false;
        }
        if (type === 'email-address' && !isEmailValid) {
            return false;
        }

        return true;
    }

    getValue() {
        return this.state.text;
    }

    focus() {
        this._getTextInputComponent().focus();
    }

    _clean() {
        this.setState({ text: '' });
    }

    _showPassword() {

        if (this.state.showPassword) {
            this.setState({ showPassword: false, passwordText: 'mostrar' });
        } else {
            this.setState({ showPassword: true, passwordText: 'esconder' });
        }
    }

    _renderShowPasswordButton() {

        if (this.props.password === true) {
            return (
                <TouchableOpacity onPress={() => this._showPassword() } style={[input.showPasswordWrapper, this.state.actived ? {} : { height: 0 }]}>
                    <View style={[input.iconShowContent, this.state.actived && this.state.text.length > 0 ? { opacity: 1 } : {}]}>
                        <Icon name='remove-red-eye' size={20} />
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _renderInputComponent() {
        let customStyleByType = {
            paddingRight: this.props.password ? 90 : 20
        };

        if(!!this.props.mask) {
            return (
                <TextInputMask
                    type={this.props.mask.type}
                    options={this.props.mask.options}
                    ref='campo'
                    style={[input.inputElement,
                            customStyleByType,
                            this.state.showMessage === true ? { opacity: 0 } : {}]}
                    autoCorrect={false}
                    secureTextEntry={this.state.showPassword ? false : this.props.password || false}
                    autoCapitalize={this.props.type === 'email-address' ? 'none' : 'sentences'}
                    onFocus={() => this._activeGroup() }
                    onSubmitEditing={event => this._onSubmitEditing(event)}
                    onChangeText={(text) => this._change({ text }) }
                    onBlur={() => this._blur() }
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                />
            );
        }
        else {
            return (
                <TextInput
                    ref='campo'
                    style={[input.inputElement, this.state.showMessage === true ? { opacity: 0 } : {}]}
                    autoCorrect={false}
                    secureTextEntry={this.state.showPassword ? false : this.props.password || false}
                    autoCapitalize={this.props.type === 'email-address' ? 'none' : 'sentences'}
                    keyboardType={this.props.type || 'default'}
                    onFocus={() => this._activeGroup() }
                    onSubmitEditing={event => this._onSubmitEditing(event)}
                    onChangeText={(text) => this._change({ text }) }
                    onBlur={() => this._blur() }
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                    />
            );
        }
    }

    render() {
        return (
            <View style={input.group}>
                <View style={input.labelWrapper}>
                    <Text
                        onPress={() => this._activeGroup() }
                        style={[input.labelText, !this.state.valid && this.state.showErrors ? input.labelTextError : {}]}>
                        {this.props.label.toUpperCase() }
                    </Text>
                </View>
                <Animated.View style={[input.inputWrapper, { height: this.state.height }]}>
                    {this._renderInputComponent()}

                    {this._renderShowPasswordButton() }

                    <TouchableOpacity onPress={() => this._clean() } style={[input.cleanWrapper, this.state.actived ? {} : { zIndex: -10 }]}>
                        <View style={[input.iconContent, this.state.actived && this.state.text.length > 0 ? { opacity: 1 } : {}]}>
                            <Icon style={input.icon} size={10} name='close' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                {this._renderMessage() }
            </View>
        );
    }
}


const input = EStyleSheet.create({
    group: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        height: 54,
        marginBottom: 25
    },
    labelWrapper: {

    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    labelTextError: {
        color: 'red'
    },
    inputWrapper: {
        height: 36,
        borderBottomWidth: 1,
        borderColor: '$colors.black1',
        position: 'relative'
    },
    inputElement: {
        flex: 1,
        fontSize: 14,
        padding: 1,
        color: 'rgba(0,0,0,0.6)'
    },
    messageWrapper: {
        flex: 1,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    message: {
        color: 'red',
        fontSize: 12,
    },
    cleanWrapper: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        zIndex: 10,
        padding: 5
    },
    showPasswordWrapper: {
        position: 'absolute',
        bottom: 4,
        right: 35,
        zIndex: 10,
        padding: 5
    },
    iconContent: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 8,
        opacity: 0
    },
    iconShowContent: {
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
    },
    textShow: {
        fontSize: 12,
        color: '#999',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 3
    },
    iconShow: {
        color: '#999',
        fontSize: 15
    },
    icon: {
        color: '#999'
    }
});
