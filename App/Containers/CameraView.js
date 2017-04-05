import React from 'react'
import { Image, TouchableHighlight, View } from 'react-native'
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
          // VVV  comment this in when testing on phone VVV
          // captureTarget={Camera.constants.CaptureTarget.disk}
          ref={(cam) => { this.camera = cam }}
          type={this.state.cameraType}
          style={Styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={Styles.buttonBar}>
            <TouchableHighlight onPress={this.takePicture.bind(this)}>
              <Image source={Icons.camera} style={{marginRight: 90, marginLeft: 140, marginBottom: 20}} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.switchCamera.bind(this)}>
              <Image source={Icons.cameraFlip} />
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
        this.props.sendPicture(data.path)
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
