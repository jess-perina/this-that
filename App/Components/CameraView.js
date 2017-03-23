import React from 'react'
import {
  Dimensions,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native'
import Icons from '../Themes/Images'
import Camera from 'react-native-camera'
import Styles from './Styles/CameraViewStyle'

export default class CameraView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cameraType: Camera.constants.Type.back
    }
  }

  render () {
    return (
      <View style={Styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam }}
          type={this.state.cameraType}
          style={Styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={Styles.buttonBar}>
            <TouchableHighlight onPress={this.takePicture.bind(this)}>
              <Image source={Icons.camera} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.switchCamera.bind(this)}>
              <Text style={Styles.button}>Flip</Text>
            </TouchableHighlight>

          </View>
          <View style={Styles.capture} />
        </Camera>
      </View>
    )
  }

  switchCamera () {
    let state = this.state
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back
    this.setState(state)
  }

  takePicture () {
    const options = {}
    // options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }
}

// // Prop type warnings
// Camera.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Camera.defaultProps = {
//   someSetting: false
// }
