import React, { Component } from 'react'
import {
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native'

import { NavBar, Info, BoxView, ViewContainer, FaImageZoom } from 'farma-lib'

export class ImageZoomPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedImagemZoom: 'https://pbs.twimg.com/media/CYFTSfTUEAELx33.jpg',
      imageZoomVisible: false,
    }
  }

  _zoomImage() {
    this.setState({imageZoomVisible: true})
  }

  render() {
    return (
      <ViewContainer>

        <NavBar title='FaImageZoom' onGoBack={() => this.props.navigator.pop()} />

      <ScrollView>

        <BoxView padding='sm'>

          <TouchableHighlight style={{width: 80, height: 55, backgroundColor: 'red'}} onPress={() => this._zoomImage()}>
            <Image style={{width: 80, height: 55}} source={{uri: this.state.selectedImagemZoom}} />
          </TouchableHighlight>

          <FaImageZoom
            url={this.state.selectedImagemZoom}
            visible={this.state.imageZoomVisible}
            onClose={() => this.setState({ imageZoomVisible: false })}
          />
        </BoxView>

      </ScrollView>

    </ViewContainer>
    )
  }

}
