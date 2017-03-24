import React, { PropTypes } from 'react'
import { View, Text, TextInput, Image, Keyboard, LayoutAnimation, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import Icons from '../Themes/Images'
import {Images, Metrics} from '../Themes'
import RoundedButton from '../Components/RoundedButton'
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
    this.state = {
      questionText: '',
      leftText: '',
      rightText: '',
      leftImage: '',
      rightImage: '',
      respondents: [],
      isPublic: false,
      visibleHeight: Metrics.screenHeight
    }
    this.isAttempting = false
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
    const { questionText, leftText, rightText } = this.state
    const { userId } = this.props
    this.isAttempting = true
    // attempt a submit - a saga is listening to pick it up from here.
    this.props.attemptSubmit(questionText, leftText, rightText, userId)
    this.setState({questionText: '', leftText: '', rightText: '', leftImage: '', rightImage: '', respondents: [], isPublic: false})
  }

  handleTypingChange = (field, text) => {
    console.log(field, text)
    this.setState({ [field]: text })
  }

  render () {
    console.log('props---', this.props)
    const { questionText, leftText, rightText } = this.state
    const { fetching } = this.props
    const editable = !fetching
    // const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <View style={[Styles.container, {height: this.state.visibleHeight}]} >
        <Text style={Styles.boldLabel}>Get Some Feedback</Text>
        <TextInput
          ref='questionText'
          style={Styles.question}
          value={questionText}
          editable={editable}
          keyboardType='default'
          returnKeyType='next'
          onChangeText={(text) => this.handleTypingChange('questionText', text)}
          placeholder='Question???'
          placeholderTextColor='white'
        />
        <View style={Styles.optionsContainer} >
          <View style={Styles.options} >
            <TextInput
              ref='leftText'
              style={{height: 40, color: 'white', textAlign: 'center'}}
              value={leftText}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              onChangeText={(text) => this.handleTypingChange('leftText', text)}
              placeholder='This'
              placeholderTextColor='white'
            />
          </View>
          <View style={{borderLeftWidth: 1, borderLeftColor: 'gray'}} />
          <View style={Styles.options} >
            <TextInput
              ref='rightText'
              style={{height: 40, color: 'white', textAlign: 'center'}}
              value={rightText}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              onChangeText={(text) => this.handleTypingChange('rightText', text)}
              placeholder='That'
              placeholderTextColor='white'
            />
          </View>
        </View>
        <ExpirationDatePicker />
        <View style={Styles.buttonContainer}>
          <RoundedButton text='Choose Friends' />
          <TouchableHighlight onPress={Actions.cameraView}>
            <Image source={Icons.camera} />
          </TouchableHighlight>
        </View>
        <RoundedButton
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
    userId: state.login.userId,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionUpdate: (field, text) => dispatch(QuestionFormActions.questionUpdate(field, text)),
    attemptSubmit: (questionText, leftText, rightText, userId) => dispatch(QuestionFormActions.questionSubmit(questionText, leftText, rightText, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)
