import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import MainNav from '../Navigation/MainNav'
import QuestionView from '../Components/QuestionView'

import MyQuestionsActions from '../Redux/MyQuestionsRedux'

// Styles
import styles from './Styles/MyQuestionsStyle'

class MyQuestions extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.mapQuestions = this.mapQuestions.bind(this)
  }

  componentDidMount () {
    console.log('fetching?', this.props.fetching)
    this.props.getMyQuestions(this.props.userId)
  }

  mapQuestions = (questions) => questions.map((question) => {
    console.log(question)
    return (<QuestionView
      key={question.id}
      text={question.title}
      left={question.leftText}
      right={question.rightText}
      leftVotes={question.leftVotes}
      rightVotes={question.rightVotes}
      leftImage={question.leftImage}
      rightImage={question.rightImage}
    />)
  })

  render () {
    return (
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <MainNav />
        { this.props.myQuestions
          ? this.mapQuestions(this.props.myQuestions)
          : <Text style={styles.boldLabel}>Done Fetching</Text>
        }
      </ScrollView>
    )
  }
}
//  <Text style={styles.boldLabel}>{JSON.stringify(this.props.myQuestions.myQuestions)}</Text>

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    // myQuestionsArray: state.myQuestions,
    fetching: state.myQuestions.fetching,
    myQuestions: state.myQuestions.myQuestions,
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyQuestions: (userId) => {
      dispatch(MyQuestionsActions.myQuestionsRequest(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions)
