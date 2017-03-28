import React from 'react'
import styles from './Styles/QuestionViewStyle'
import { AppRegistry, Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'

export default class FeedQuestionAnswered extends React.Component {
  calculatePercentage (input) {
    const percent = Math.floor(input / (this.props.rightVotes + this.props.leftVotes) * 100)
    if (percent === Infinity) return 100
    else return (isNaN(percent) ? 0 : percent)
  }

  render () {
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
      </View>
    )
  }
}

AppRegistry.registerComponent('FeedQuestionAnswered', () => FeedQuestionAnswered)

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
