import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/MainNavStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

import NavActions from '../Redux/NavRedux'

class MainNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: ''
    }
  }

  handlePress = (nextView) => {
    console.log(nextView)
    switch (nextView) {
      case 'questionForm':
        console.log('in switch--', nextView)
        Actions.questionForm()
        break
      case 'myQuestions':
        Actions.myQuestions()
        break
      case 'Feed':
        Actions.Feed()
        break
      case 'random':
        Actions.random()
        break
      default:
        return
    }
    this.props.changeView(nextView)
  }

  render () {
    return (
      <View style={{height: 50, paddingLeft: 10, paddingRight: 10}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 20, backgroundColor: 'pink'}} >
          <TouchableHighlight onPress={(event) => this.handlePress('questionForm')}>
            <Text style={styles.row}>New{'\n'}Question</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(event) => this.handlePress('myQuestions')}>
            <Text style={styles.row}>My{'\n'}Questions</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(event) => this.handlePress('Feed')}>
            <Text style={styles.row}>Friend{'\n'}Question</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={(event) => this.handlePress('random')}>
            <Text style={styles.row}>Random{'\n'}Question</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.nav.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (page) => dispatch(NavActions.changePage(page))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNav)
