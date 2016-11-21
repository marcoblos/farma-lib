import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'

import { NavBar, BoxView, ViewContainer, FaText } from 'farma-lib'

export class BoxViewPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='Info' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='lg'>

          <BoxView padding='sm' style={{backgroundColor: 'white'}}>
            <FaText>Opa!</FaText>
          </BoxView>

          <BoxView padding='sm' margin='sm' border={true} style={{backgroundColor: 'white'}}>
            <FaText>Opa!</FaText>
          </BoxView>

          <BoxView padding='sm' margin='sm' border={true} style={{backgroundColor: 'white'}}>
            <FaText>Opa!</FaText>
          </BoxView>

        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
