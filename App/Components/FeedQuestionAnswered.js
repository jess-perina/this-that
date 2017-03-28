import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/FeedQuestionAnsweredStyle'

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
        </View>
        <View style={styles.optionsContainer} >
          <Text style={styles.boldLabel} >{this.props.leftQ + ' : ' + this.calculatePercentage(this.props.leftVotes) + '%'}</Text>
          <Text style={styles.boldLabel} >{this.props.rightQ + ' : ' + this.calculatePercentage(this.props.rightVotes) + '%'}</Text>
        </View>
      </View>
    )
  }
}

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
