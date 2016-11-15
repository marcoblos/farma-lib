import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer } from 'farma-lib'

export class InfoPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='Info' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>
          <Info label='Label' value='value' />
          <Info label='Label' value='value' icon='history' />
          <Info label='Label' value='value' icon='history' uppercase />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
