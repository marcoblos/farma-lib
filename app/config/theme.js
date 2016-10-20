import { Dimensions, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const {height, width} = Dimensions.get('window')

/**
 * COLORS
 */




const COLOR_BLACK_1 = '#000'
const COLOR_WHITE_1 = '#fff'
const COLOR_RED_1 = '#ff0000'
const COLOR_GRAY_1 = '#d3d3d3'
const COLOR_ULTRA_LIGHT_GRAY_1 = '#f8f8ff'
const PRIMARY_COLOR = '#f98e2e'
const SECONDARY_COLOR = '#4c4c4c'
const TERNARY_COLOR = 'white'

const SUCCESS_COLOR = '#6ad776'
const SUCCESS_TEXT_COLOR = 'white'

const INFO_COLOR = '#6dbeef'
const INFO_TEXT_COLOR = 'white'

const ALERT_COLOR = '#f98e2e'
const ALERT_TEXT_COLOR = 'white'

const DANGER_COLOR = '#f9522e'
const DANGER_TEXT_COLOR = 'white'

/**
 * EXPORT
 */
export class ConfigTheme {
    static build() {
        EStyleSheet.build({
            colors: {
                black1: COLOR_BLACK_1,
                black2: '#555',
                black3: '#777',
                white1: COLOR_WHITE_1,
                red1: COLOR_RED_1,
                gray1: COLOR_GRAY_1,
                gray2: '#ddd',
                ultraLightGray1: COLOR_ULTRA_LIGHT_GRAY_1,
                primary: PRIMARY_COLOR,
                secondary: SECONDARY_COLOR,
                ternary: TERNARY_COLOR,
                color1: '#444',
                color2: '#666',
                color3: '#999',
                success: SUCCESS_COLOR,
                successText: SUCCESS_TEXT_COLOR,
                info: INFO_COLOR,
                infoText: INFO_TEXT_COLOR,
                alert: ALERT_COLOR,
                alertText: ALERT_TEXT_COLOR,
                danger: DANGER_COLOR,
                dangerText: DANGER_TEXT_COLOR,
                headerBackground: '#555'
            },
            radius: 5,
            sm: width*0.03,
            md: width*0.05,
            lg: width*0.09,
            homeTabBar: {
                selectedBorderColor: COLOR_RED_1
            },
            sizes: {
                statusPadding: Platform.select({
                    ios: 20,
                    android: 0
                })
            }
        })
    }
}
