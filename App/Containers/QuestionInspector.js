import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import FeedQuestionAnswered from '../Components/FeedQuestionAnswered'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/QuestionInspectorStyle'
import QuestionInspectorActions from '../Redux/QuestionInspectorRedux'

class QuestionInspector extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    console.log(this.props.question)
    const {leftText, rightText, leftVotes, rightVotes, title} = this.props.question
    return (
      <View style={styles.container}>
        <FeedQuestionAnswered text={title}
        leftQ={leftText}// + ': ' + this.state.leftVotes}
        rightQ={rightText}// + ': ' + this.state.rightVotes}
        leftVotes={leftVotes}
        rightVotes={rightVotes}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questionInspector.payload.question
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     goGetTheQuestion: () => {
//       dispatch(QuestionInspectorActions.questionInspectorRequest())
//     }
//   }
// }

export default connect(mapStateToProps)(QuestionInspector)
