import React, { PropTypes } from 'react'
import { View, Text, TextInput, Image, Keyboard, LayoutAnimation, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import {Images, Metrics, Colors} from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import FullButton from '../Components/FullButton'
import MainNav from '../Navigation/MainNav'
import ExpirationDatePicker from '../Components/ExpirationDatePicker'

import { Actions } from 'react-native-router-flux'
// Styles
import Styles from './Styles/QuestionFormStyle'
// import Actions
import QuestionFormActions from '../Redux/QuestionFormRedux'

class QuestionForm extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    let today = new Date()
    let date = today.toLocaleDateString()
    let time = today.toTimeString()

    this.state = {
      questionText: '',
      leftText: '',
      rightText: '',
      leftImage: 'https://lorempixel.com/400/600/cats/',
      rightImage: 'https://lorempixel.com/400/600/cats/',
      photoSide: '',
      photoUri: '',
      respondents: [],
      expirationDate: date,
      expirationTime: time,
      isPublic: false,
      visibleHeight: Metrics.screenHeight
    }
    this.isAttempting = false
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.respondents !== this.props.respondents) {
      this.setState({
        respondents: newProps.respondents
      })
    }
    if (newProps.photoUri !== this.props.photoUri) {
      this.setState({
        [`${this.state.photoSide}Image`]: newProps.photoUri
      })
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
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

  handlePressSubmit = () => {
    const { questionText, leftText, rightText, respondents, leftImage, rightImage, expirationDate, expirationTime } = this.state
    const { userId } = this.props
    this.isAttempting = true
    // attempt a submit - a saga is listening to pick it up from here.
    this.props.attemptSubmit(questionText, leftText, rightText, leftImage, rightImage, respondents, expirationDate, expirationTime, userId)
    this.setState({questionText: '', leftText: '', rightText: '', leftImage: '', rightImage: '', respondents: [], isPublic: false})
  }

  handleTypingChange = (field, text) => {
    this.setState({ [field]: text })
  }

  handleDateChange = (date, time) => {
    this.setState({expirationDate: date, expirationTime: time})
  }

  leftCam = (side) => {
    this.setState({photoSide: side})
    Actions.cameraView()
  }

  render () {
    const { questionText, leftText, rightText } = this.state
    const { fetching } = this.props
    const editable = !fetching
    // const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <View style={[Styles.container, {height: this.state.visibleHeight}]} >
        <MainNav />
        <TextInput
          ref='questionText'
          style={Styles.question}
          value={questionText}
          editable={editable}
          keyboardType='default'
          returnKeyType='next'
          onChangeText={(text) => this.handleTypingChange('questionText', text)}
          onSubmitEditing={() => this.refs.leftText.focus()}
          placeholder='Question???'
          placeholderTextColor='white'
        />
        <View style={Styles.optionsContainer} >
          <View style={Styles.options} >
            <Image source={{uri: this.state.leftImage}} style={Styles.imageContainer}>
              <TextInput
                ref='leftText'
                style={{height: 40, color: 'white', textAlign: 'center', marginTop: 250}}
                value={leftText}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                onChangeText={(text) => this.handleTypingChange('leftText', text)}
                onSubmitEditing={() => this.refs.rightText.focus()}
                placeholder='This'
                placeholderTextColor='white'
              />
            </Image>
          </View>
          <View style={{borderLeftWidth: 1, borderLeftColor: 'gray'}} />
          <View style={Styles.options} >
            <Image source={{uri: this.state.rightImage}} style={Styles.imageContainer}>
              <TextInput
                ref='rightText'
                style={{height: 40, color: 'white', textAlign: 'center', marginTop: 250}}
                value={rightText}
                editable={editable}
                keyboardType='default'
                returnKeyType='done'
                onChangeText={(text) => this.handleTypingChange('rightText', text)}
                placeholder='That'
                placeholderTextColor='white'
              />
            </Image>
          </View>
        </View>
        <View style={{height: 50}}>
          <View style={Styles.buttonContainer}>
            <View>
              <RoundedButton text='Left Photo' onPress={() => { this.leftCam('left') }} />
            </View>
            <View>
              <RoundedButton text='Right Photo' onPress={() => { this.leftCam('right') }} />
            </View>
          </View>
        </View>
        <ExpirationDatePicker
          date={this.state.expirationDate}
          time={this.state.expirationTime}
          onConfirm={this.handleDateChange}
        />
        <RoundedButton text='Choose Friends' onPress={Actions.Contacts} />
        <FullButton
          text='Submit'
          onPress={this.handlePressSubmit}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    questionText: state.question.questionText,
    leftText: state.question.leftText,
    rightText: state.question.rightText,
    leftImage: state.question.leftImage,
    rightImage: state.question.rightImage,
    photoUri: state.question.photoUri,
    respondents: state.question.respondents,
    expirationDate: state.question.expirationDate,
    expirationTime: state.question.expirationTime,
    userId: state.login.userId,
    username: state.login.username,
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSubmit: (questionText, leftText, rightText, leftImage, rightImage, respondents, expirationDate, expirationTime, userId) => dispatch(QuestionFormActions.questionSubmit(questionText, leftText, rightText, leftImage, rightImage, respondents, expirationDate, expirationTime, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)
