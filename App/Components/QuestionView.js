import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/QuestionViewStyle'

export default class QuestionView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View style={styles.optionsContainer} >
          <Text style={styles.boldLabel} >{this.props.left}</Text>
          <Text style={styles.boldLabel} >{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

// // Prop type warnings
// QuestionView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// QuestionView.defaultProps = {
//   someSetting: false
// }
