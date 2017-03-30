import React from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Form, Item, Textarea } from 'native-base'
import { Metrics, Colors } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import FullButton from '../Components/RoundedButton'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/AnswerModalStyle'

export default class AnswerModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.modalOn = this.modalOn.bind(this)
    this.modalCancel = this.modalCancel.bind(this)
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
  render () {
    console.log('RENDERING MODAL', this.state)
    if (this.state.modal) {
      return (
        <View style={{flex: 1, height: Metrics.screenHeight, width: Metrics.screenWidth, top: 120, position: 'absolute', backgroundColor: Colors.background}}>
          <Form style={{height: 400}}>
            <Item last>
              <Textarea
                placeholder='Add Comment Here'
                placeholderTextColor='white'
                style={{height: 400, width: Metrics.screenWidth, alignItems: 'center', color: 'white'}} />
            </Item>
          </Form>
          <RoundedButton text='CANCEL' onPress={this.modalCancel} />
          <RoundedButton text='Submit' onPress={() => {
            this.props.onClickSubmit(this.state.comment)
            Actions.pop()
          }} />
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

