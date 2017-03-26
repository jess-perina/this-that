import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
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
    this.props.goGetTheQuestion()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.boldLabel} >Top</Text>
        </View>
        <View style={styles.optionsContainer} >
          <Text style={styles.boldLabel} >Left</Text>
          <Text style={styles.boldLabel} >Right</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goGetTheQuestion: () => {
      dispatch(QuestionInspectorActions.questionInspectorRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionInspector)
