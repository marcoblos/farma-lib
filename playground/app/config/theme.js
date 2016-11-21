import { Dimensions, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const { height, width } = Dimensions.get('window')

/**
* Cores base
*/

const PRIMARY_COLOR = '#f98e2e'
const SECONDARY_COLOR = '#4c4c4c'
const TERNARY_COLOR = '#ffffff'

/**
* Alertas e mensagens
*/

const SUCCESS_COLOR = '#6ad776'
const SUCCESS_TEXT_COLOR = '#ffffff'

const INFO_COLOR = '#6dbeef'
const INFO_TEXT_COLOR = '#ffffff'

const ALERT_COLOR = '#f98e2e'
const ALERT_TEXT_COLOR = '#ffffff'

const DANGER_COLOR = '#f9522e'
const DANGER_TEXT_COLOR = '#ffffff'

/**
* layout
*/

const SIZE_SM = width * 0.03
const SIZE_MD = width * 0.05
const SIZE_LG = width * 0.09

const BORDER_RADIUS = 5

const HEADER_BACKGROUND = '#555'
const BACKGROUND_COLOR = '#555'
const HEADER_TEXT_COLOR = '#ffffff'

/**
* Escala de cores
*/
const BLACK = '#000000'
const WHITE = '#ffffff'

const SCALE_0  = '#000000'
const SCALE_1  = '#222222'
const SCALE_2  = '#333333'
const SCALE_3  = '#555555'
const SCALE_4  = '#777777'
const SCALE_5  = '#888888'
const SCALE_6  = '#999999'
const SCALE_7  = '#dddddd'
const SCALE_8  = '#cccccc'
const SCALE_9  = '#ffffff'

const GRAY_0  = '#000000'
const GRAY_1  = '#555555'
const GRAY_2  = '#777777'
const GRAY_3  = '#999999'
const GRAY_4  = '#dddddd'

/**
 * EXPORT
 */
export class ConfigTheme {
  static build() {
    EStyleSheet.build({
      colors: {
        black: BLACK,
        white: WHITE,

        scale0: SCALE_0,
        scale1: SCALE_1,
        scale2: SCALE_2,
        scale3: SCALE_3,
        scale4: SCALE_4,
        scale5: SCALE_5,
        scale6: SCALE_6,
        scale7: SCALE_7,
        scale8: SCALE_8,
        scale9: SCALE_9,

        gray0: GRAY_0,
        gray1: GRAY_1,
        gray2: GRAY_2,
        gray3: GRAY_3,
        gray4: GRAY_4,

        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
        ternary: TERNARY_COLOR,

        success: SUCCESS_COLOR,
        successText: SUCCESS_TEXT_COLOR,
        info: INFO_COLOR,
        infoText: INFO_TEXT_COLOR,
        alert: ALERT_COLOR,
        alertText: ALERT_TEXT_COLOR,
        danger: DANGER_COLOR,
        dangerText: DANGER_TEXT_COLOR,

        headerBackground: HEADER_BACKGROUND,
      },
      radius: BORDER_RADIUS,
      sm: SIZE_SM,
      md: SIZE_MD,
      lg: SIZE_LG,
      sizes: {
        statusPadding: Platform.select({
          ios: 20,
          android: 0,
        }),
      },
    })
  }
}
