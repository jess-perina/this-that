import React from 'react'
import { LayoutAnimation, View, Keyboard, Text, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Form, Button } from 'native-base'
import { Metrics, Colors } from '../Themes'
// import RoundedButton from '../Components/RoundedButton'
// import FullButton from '../Components/RoundedButton'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/AnswerModalStyle'

export default class AnswerModal extends React.Component {
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.modalOn = this.modalOn.bind(this)
    this.modalCancel = this.modalCancel.bind(this)
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  componentDidMount () {
    this.setState({modal: this.props.modal})
    console.log('COMPONENT DID MOUNT', this.state)
  }
  modalOn () {
    this.setState({modal: true})
  }
  modalCancel () {
    this.setState({modal: false})
    Actions.pop()
  }
  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }
  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }
  render () {
    console.log('RENDERING MODAL', this.state)
    if (this.state.modal) {
      return (
        <View style={{flex: 1, height: Metrics.screenHeight, width: Metrics.screenWidth, top: 120, position: 'absolute', backgroundColor: Colors.background}}>
          <Form style={{height: 400}} >
            <Button danger onPress={this.modalCancel}><Text>CANCEL</Text></Button>
            <Button success
              onPress={() => {
                const comment = this.state.comment
                this.props.onClickSubmit(comment)
                Actions.pop()
              }}
                    ><Text>SUBMIT</Text></Button>
            <TextInput
              editable
              maxLength={140}
              multiline
              numberOfLines={7}
              returnKeyType='done'
              placeholder='Add Comment Here'
              placeholderTextColor='white'
              keyboardType='default'
              onChange={(e) => {
                this.setState({comment: e.nativeEvent.text})
              }}
              style={{height: 400, width: Metrics.screenWidth, alignItems: 'center', color: 'white'}} />
          </Form>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

