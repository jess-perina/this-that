import React from 'react'
import { View, Text, Image } from 'react-native'

// import FitImage from 'react-native-fit-image'
import styles from './Styles/QuestionViewStyle'

export default class QuestionView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View style={styles.optionsContainer} >
          <View >
            <Image source={{uri: this.props.leftImage}} style={styles.imageContainer} />
            <Text style={styles.boldLabel} onPress={this.props.onClickLeft} >{this.props.left}</Text>
            <Text style={styles.boldLabel} >{this.props.leftVotes}</Text>
          </View>
          <View>
            <Image source={{uri: this.props.rightImage}} style={styles.imageContainer} />
            <Text style={styles.boldLabel} onPress={this.props.onClickRight} >{this.props.right}</Text>
            <Text style={styles.boldLabel} >{this.props.rightVotes}</Text>
          </View>
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
