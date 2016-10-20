import React, { Component } from 'react'
import { View, Text } from 'react-native'

import * as axios from 'axios'

import {ConfigTheme} from 'fa-config'

import { StorageService } from 'fa-services'

import { AppNavigator, FaLoader, FaToaster } from 'fa-components'

import FCM from 'react-native-fcm'

console.disableYellowBox = true

export class Farma extends Component {
    constructor(props) {
        super(props)
        ConfigTheme.build()

        // this.initialRoute = 'LoginPage'
        // this.initialRoute = 'PocPage'
        // this.initialRoute = 'cotacoes-empty'
        this.initialRoute = 'DashboardPage'
    }

    componentDidMount() {
      StorageService.getString('Usertoken')
        .then((Usertoken) => {
          axios.defaults.headers.common['Usertoken'] = Usertoken.toString()
        })

        let teste

        FCM.requestPermissions() // for iOS
        FCM.getFCMToken().then(token => {
            console.log("token device: ", token)
            StorageService.setString('Devicetoken', token)
            // store fcm token in your server
        })
        this.notificationUnsubscribe = FCM.on('notification', (notif) => {

            console.log(notif)
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification) {
              //this is a local notification
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
        })
        this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        })
    }

    render() {
        return (
          <View style={{flex: 1}}>
            <FaLoader />
            <FaToaster />
            <AppNavigator
                initialRoute={{name: this.initialRoute}} />
          </View>
        )
    }
}
