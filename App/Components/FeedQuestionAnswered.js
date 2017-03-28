import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/QuestionViewStyle'
import { Pie } from 'react-native-pathjs-charts'

export default class FeedQuestionAnswered extends React.Component {
  calculatePercentage (input) {
    const percent = Math.floor(input / (this.props.rightVotes + this.props.leftVotes) * 100)
    if (percent === Infinity) return 100
    else return (isNaN(percent) ? 0 : percent)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View style={styles.optionsContainer} >
          <View>
            <Pie
              data={data}
              options={options}
              accessorKey='population' />
          </View>
          <Text style={styles.boldLabel} >{this.props.leftQ + ' : ' + this.calculatePercentage(this.props.leftVotes) + '%'}</Text>
          <Text style={styles.boldLabel} >{this.props.rightQ + ' : ' + this.calculatePercentage(this.props.rightVotes) + '%'}</Text>
        </View>
      </View>
    )
  }
}

let data = [{
  'name': 'Washington',
  'population': 7694980
}, {
  'name': 'Oregon',
  'population': 2584160
}, {
  'name': 'Minnesota',
  'population': 6590667
}, {
  'name': 'Alaska',
  'population': 7284698
}]

let options = {
  margin: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
  },
  width: 350,
  height: 350,
  color: '#2980B9',
  r: 50,
  R: 150,
  legendPosition: 'topLeft',
  animate: {
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3
  },
  label: {
    fontFamily: 'Arial',
    fontSize: 8,
    fontWeight: true,
    color: '#ECF0F1'
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
