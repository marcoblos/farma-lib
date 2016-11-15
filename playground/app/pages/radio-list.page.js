import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer, FaRadioList } from 'farma-lib'

const options = [
  {
    'label': '10 minutos',
    'value': '10min',
  },
  {
    'label': '20 minutos',
    'value': '20min',
  },
  {
    'label': '30 minutos',
    'value': '30min',
  }
]

export class RadioListPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedValue: '10min'
    }
  }

  _onSelected(selected) {
    this.setState({selectedValue: selected})
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='FaRadioList' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView style={{backgroundColor: 'white'}} padding='sm'>
          <FaRadioList options={options} selected={this.state.selectedValue} onSelected={(selected) => this._onSelected(selected)} />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
