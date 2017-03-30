import React from 'react'
import { View, Text } from 'react-native'

// import FitImage from 'react-native-fit-image'
import styles from './Styles/QuestionViewStyle'

export default class QuestionView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View >
          <Text style={styles.boldLabel} onPress={this.props.onClickLeft} >{this.props.left}</Text>
          <Text style={styles.boldLabel} onPress={this.props.onClickRight} >{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

// const myStyles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5FCFF',
//     flex: 1,
//     paddingTop: 20
//   },
//   flex: {
//     flex: 1
//   },
//   imageRounded: {
//     borderRadius: 20,
//     marginTop: 20
//   },
//   marginAndBorder: {
//     borderColor: 'red',
//     borderWidth: 2,
//     margin: 20
//   },
//   twoColumnsContainer: {
//     flexDirection: 'row',
//     marginTop: 20
//   }
// })

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
