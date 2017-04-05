import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/MainNavStyles'
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
    console.log('current page state---', this.state.currentPage)
    switch (nextView) {
      case 'questionForm':
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

  componentWillReceiveProps (newProps) {
    if (newProps.currentPage !== this.state.currentPage) {
      this.setState({
        currentPage: newProps.currentPage
      })
    }
  }

  setStyle = (view) => {
    if (this.state.currentPage === view) {
      return styles.selectedRow
    } else return styles.row
  }

  render () {
    let current = this.state.currentPage
    console.log('current---', current)
    return (
      <View style={styles.background}>
        <View style={styles.navContainer}>
          <View style={styles.navContentContainer} >
            <TouchableHighlight onPress={(event) => this.handlePress('questionForm')}>
              <Text style={[styles.row, current === 'questionForm' && styles.selectedRow]}>New{'\n'}Question</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={(event) => this.handlePress('myQuestions')}>
              <Text style={this.setStyle('myQuestions')}>My{'\n'}Questions</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={(event) => this.handlePress('Feed')}>
              <Text style={this.setStyle('Feed')}>Friend{'\n'}Question</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={(event) => this.handlePress('random')}>
              <Text style={this.setStyle('random')}>Random{'\n'}Question</Text>
            </TouchableHighlight>
          </View>
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
