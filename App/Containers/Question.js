import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import Icons from '../Themes/Images'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import QuestionActions from '../Redux/QuestionRedux'

// Styles
import styles from '../Components/Styles/CreateQuestionStyle'

class Question extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

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
          <View style={{borderLeftWidth: 1, borderLeftColor: 'gray'}}/>
          <View style={styles.options} > 
            <TextInput 
              style={{height: 40, textAlign: 'center'}}
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
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question.question,
    left: state.question.left,
    right: state.question.right
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionUpdate: (field, text) => dispatch(QuestionActions.questionUpdate(field, text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)