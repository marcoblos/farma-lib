import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Dimensions, ScrollView, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'


const { height, width } = Dimensions.get('window');

var DEVICE_HEIGHT = height;
var DEVICE_WIDTH = width;

export class ZoomableImageTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      maximumZoomScale: 1,
      minimumZoomScale: 1,
      imageComponent: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState(imageComponent: nextProps);
  }

  componentDidMount() {

    debugger
    if(Image.getSize && this.props.source) {
      Image.getSize(this.props.source.uri,
        (width, height) => {
          this.setState({width, height});
        }
      );
    }
  }


  render() {

    var { width, height } = this.state;
    var {
      style,
      minimumZoomScale,
      maximumZoomScale,
      imageComponent,
      ...props
    } = this.props;

    var ImageComponent = imageComponent;
    var scale = Math.max(width/DEVICE_WIDTH, height/DEVICE_HEIGHT);

    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        centerContent={true}
        decelerationRate={0.95}
        minimumZoomScale={minimumZoomScale}
        maximumZoomScale={maximumZoomScale}
      >
        <ImageComponent {...props} style={[{ width: width/scale, height: height/scale }, style]} />
      </ScrollView>
      )
  }

}
