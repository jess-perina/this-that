import React from 'react'
import {
  Dimensions,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Camera from 'react-native-camera'
import styles from './Styles/CameraViewStyle'

export default class CameraView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
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
