import React, { Component } from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'

export class FaIcon extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Icon {...this.props} />
    )
  }
}
