import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import styles from './Styles/QuestionViewStyle'
import FitImage from 'react-native-fit-image'

let myStyles = StyleSheet.create({
  fitImage: {
    borderRadius: 20
  },
  flex: {
    flex: 1
  },
  fitImageWithSize: {
    height: 100,
    width: 30
  },
  twoColumnsContainer: {
    flexDirection: 'row',
    marginTop: 20
  }
})

export default class QuestionView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.boldLabel} >{this.props.text}</Text>
        </View>
        <View style={styles.optionsContainer} >
          <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <View style={styles.twoColumnsContainer}>
            <FitImage
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              originalWidth={400}
              originalHeight={400}
              style={myStyles.flex}
       />
            <FitImage
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              originalWidth={400}
              originalHeight={400}
              style={myStyles.flex}
       />
          </View>
          <Text style={styles.boldLabel} onPress={this.props.onClickLeft} >{this.props.left}</Text>
          <Text style={styles.boldLabel} onPress={this.props.onClickRight} >{this.props.right}</Text>
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
