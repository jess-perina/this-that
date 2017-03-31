import React from 'react'
import styles from './Styles/QuestionViewStyle'
import { AppRegistry, Text, View, TouchableHighlight, Image } from 'react-native'
import { Colors } from '../Themes/'

export default class FeedQuestionAnswered extends React.Component {

  calculatePercentage (input) {
    const percent = Math.floor(input / (this.props.rightVotes + this.props.leftVotes) * 100)
    if (percent === Infinity) return 100
    else return (isNaN(percent) ? 0 : percent)
  }

  render () {
    let detailsButton = null
    if (this.props.details) {
      detailsButton =
      (<TouchableHighlight onPress={() => {
        this.props.goGetTheQuestion(this.props.questionId)
      }}>
        <Text style={{color: 'white'}}>DETAILs</Text>
      </TouchableHighlight>)
    }

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}> QUESTION ASKED BY {this.props.asker} </Text>
        <View style={styles.optionsContainer} >
          <View>
            <Image source={{uri: this.props.leftImage}} style={styles.imageContainer} />
            <Text style={styles.boldLabel} >{this.props.leftQ + ' : ' + this.calculatePercentage(this.props.leftVotes) + '%'}</Text>
          </View>
          <View>
            <Image source={{uri: this.props.rightImage}} style={styles.imageContainer} />
            <Text style={styles.boldLabel} >{this.props.rightQ + ' : ' + this.calculatePercentage(this.props.rightVotes) + '%'}</Text>
          </View>
        </View>
        <View >
          {detailsButton}
        </View>
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
