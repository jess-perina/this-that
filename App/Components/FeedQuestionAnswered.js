import React from 'react'
import styles from './Styles/QuestionViewStyle'
import { AppRegistry, Text, View, TouchableHighlight } from 'react-native'
import PieChart from 'react-native-pie-chart'
import QuestionInspectorActions from '../Redux/QuestionInspectorRedux'
export default class FeedQuestionAnswered extends React.Component {
  calculatePercentage (input) {
    const percent = Math.floor(input / (this.props.rightVotes + this.props.leftVotes) * 100)
    if (percent === Infinity) return 100
    else return (isNaN(percent) ? 0 : percent)
  }

  render () {
    console.log('FEED QUESTION PROPS', this.props)
    return (
      <View style={styles.container}>
        <View style={{marginTop: 5}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
          { (this.props.leftVotes && this.props.rightVotes) ? (<PieChart
            chart_wh={100}
            series={[10000 * this.props.rightVotes + 1, 10000 * this.props.leftVotes + 1]}
            sliceColor={['#F44336', '#2196F3']}
            />)
            : null
          }
        </View>
        <View style={styles.optionsContainer} >
          <Text style={styles.boldLabel} >{this.props.leftQ + ' : ' + this.calculatePercentage(this.props.leftVotes) + '%'}</Text>
          <Text style={styles.boldLabel} >{this.props.rightQ + ' : ' + this.calculatePercentage(this.props.rightVotes) + '%'}</Text>
        </View>
        <TouchableHighlight onPress = {() => {
          this.props.goGetTheQuestion(this.props.questionId)
        }}>
          <Text>DETAILs</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

AppRegistry.registerComponent('FeedQuestionAnswered', () => FeedQuestionAnswered)

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // goGetTheQuestion: (questionId) => {
//     //   dispatch(QuestionInspectorActions.questionInspectorRequest(questionId))
//     // }
//   }
// }

// // Prop type warnings
// FeedQuestionAnswered.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// FeedQuestionAnswered.defaultProps = {
//   someSetting: false
// }
