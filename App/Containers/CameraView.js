import React from 'react'
import {
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native'
import { connect } from 'react-redux'
import Icons from '../Themes/Images'
import Camera from 'react-native-camera'
import Styles from './Styles/CameraViewStyle'
import { Actions } from 'react-native-router-flux'

import QuestionFormActions from '../Redux/QuestionFormRedux'

class CameraView extends React.Component {
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
          // captureTarget={Camera.constants.CaptureTarget.memory}
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
      .then((data) => {
        console.log('camera data ---', data)
        this.props.sendPicture(data.mediaUri)
      })
      .catch(err => console.error(err))
    Actions.pop()
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPicture: (photoUri) => dispatch(QuestionFormActions.dispatchPhoto(photoUri))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView)
