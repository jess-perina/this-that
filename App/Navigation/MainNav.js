import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import styles from './Styles/MainNavStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

class MainNav extends React.Component {
  render () {
    return (
      <View style={{height: 50, paddingLeft: 10, paddingRight: 10}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 20, backgroundColor: 'pink'}} >
          <TouchableHighlight onPress={Actions.questionForm}>
            <Text style={styles.row}>New{'\n'}Question</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={Actions.myQuestions}>
            <Text style={styles.row}>My{'\n'}Questions</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={Actions.Feed}>
            <Text style={styles.row}>Friend{'\n'}Question</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={Actions.cameraView}>
            <Text style={styles.row}>Random{'\n'}Question</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default MainNav
