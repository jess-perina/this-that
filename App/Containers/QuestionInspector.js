import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
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
    console.log('aws testing?')
    this.props.postTest()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>QuestionInspector Container</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postTest: () => {
      dispatch(QuestionInspectorActions.questionInspectorAwsTest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionInspector)
