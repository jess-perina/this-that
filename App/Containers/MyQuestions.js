import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MyQuestionsActions from '../Redux/MyQuestionsRedux'

// Styles
import styles from './Styles/MyQuestionsStyle'

class MyQuestions extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getMyQuestions(this.props.userId)
  }

  render () {
    console.log('questionprops---', this.props)
    return (
      <ScrollView style={styles.container}>
        <Text>My Questions Container</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId
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
