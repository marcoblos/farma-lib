import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const {
  width,
} = Dimensions.get('window')

module.exports = EStyleSheet.create({

  row: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 3,
  },

  bottomButton: {
    margin: 15,
  },

  box: {
    borderRadius: 3,
    margin: width * 0.03,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 3,
    backgroundColor: 'white',
  },

  padding: {
    padding: '$sm',
  },

  boxBody: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  sm: {
    padding: 5,
  },
  md: {
    padding: 10,
  },
  lg: {
    padding: 15,
  },
})
