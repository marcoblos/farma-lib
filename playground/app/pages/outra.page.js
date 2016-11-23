import React, { Component } from 'react'
import {
  ScrollView,
  Text,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer } from 'farma-lib'

export class OutraPage extends Component {

  constructor(props) {
    super(props)
  }

  _goTo(page) {
    this.props.navigator.push({
      name: page,
      title: 'Nova pagina...'
    })
  }

  render() {
    return (
      <ViewContainer>

      <ScrollView>

        <BoxView padding='sm'>
          <Text onPress={() => this._goTo('OutraPage')}>Outra!</Text>
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
