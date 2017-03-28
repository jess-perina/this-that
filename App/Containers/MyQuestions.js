import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import MainNav from '../Navigation/MainNav'

import MyQuestionsActions from '../Redux/MyQuestionsRedux'

// Styles
import styles from './Styles/MyQuestionsStyle'

class MyQuestions extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.log('fetching?', this.props.fetching)
    this.props.getMyQuestions(this.props.userId)
  }

  render () {
    console.log('questionprops---', this.props)
    return (
      <ScrollView style={styles.container}>
        <MainNav />
        <Text style={styles.boldLabel}>My Questions Container</Text>
        { this.props.myQuestions.myQuestions ?
          <Text style={styles.boldLabel}>{JSON.stringify(this.props.myQuestions.myQuestions)}</Text> :
          <Text style={styles.boldLabel}>Done Fetching</Text>
        }

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    // myQuestionsArray: state.myQuestions,
    fetching: state.myQuestions.fetching,
    myQuestions: state.myQuestions,
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
