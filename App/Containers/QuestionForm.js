import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import Icons from '../Themes/Images'

// import QuestionFormActions from '../Redux/QuestionFormRedux'
import QuestionFormActions from '../Redux/QuestionFormRedux'

// Styles
import styles from './Styles/QuestionFormStyle'

class QuestionForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.isAttempting = false
  }

  handlePressLogin = () => {
    const { question, left, right, userId } = this.props
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptSubmit(question, left, right, userId)
  }

  render () {
    return (
      <View style={styles.container} >
        <Text style={styles.boldLabel}>Get Some Feedback</Text>
        <TextInput
          style={styles.question}
          placeholder='Question???'
          placeholderTextColor='white'
          onChangeText={(text) => this.props.questionUpdate('question', text)}
          value={this.props.question}
        />
        <View style={styles.optionsContainer} >
          <View style={styles.options} >
            <TextInput
              style={{height: 40, color: 'white', textAlign: 'center'}}
              placeholder='This'
              placeholderTextColor='white'
              onChangeText={(text) => this.props.questionUpdate('left', text)}
              value={this.props.left}
            />
          </View>
          <View style={{borderLeftWidth: 1, borderLeftColor: 'gray'}} />
          <View style={styles.options} >
            <TextInput
              style={{height: 40, color: 'white', textAlign: 'center'}}
              placeholder='That'
              placeholderTextColor='white'
              onChangeText={(text) => this.props.questionUpdate('right', text)}
              value={this.props.right}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton text='Choose Friends' />
          <Image source={Icons.usageExamples} />
        </View>
        <RoundedButton
          text='Submit'
          onPress={this.handlePressLogin}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question.question,
    left: state.question.left,
    right: state.question.right,
    userId: state.login.userId,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionUpdate: (field, text) => dispatch(QuestionFormActions.questionUpdate(field, text)),

    attemptSubmit: (question, left, right, userId) => dispatch(QuestionFormActions.questionSubmit(question, left, right, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)
