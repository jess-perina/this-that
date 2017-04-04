import React, { Component } from 'react'
import { ScrollView, Image, Text, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <Text onPress={Actions.listviewExample} style={styles.text} >Go to ListviewExample!</Text>
        <Text onPress={Actions.questionForm} style={styles.text} >Go to Question Example!</Text>
        <Text onPress={Actions.myQuestions} style={styles.text} >Go to My Questions!</Text>
        <Text onPress={Actions.Feed} style={styles.text} >Go to Questions Asked Me!</Text>
        <Text onPress={Actions.QuestionInspector} style={styles.text} >Go to question inspector (temp)!</Text>
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
