import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import Contacts from '../Containers/Contacts'
import QuestionForm from '../Containers/QuestionForm'
import MyQuestions from '../Containers/MyQuestions'
import QuestionInspector from '../Containers/QuestionInspector'
import CameraView from '../Containers/CameraView'
import Feed from '../Containers/Feed'
import QuestionInspector from '../Containers/QuestionInspector'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='questionForm' component={QuestionForm} title='QuestionForm' />
            <Scene key='myQuestions' component={MyQuestions} title='My Question' />
            <Scene initial key='loginScreen' component={LoginScreen} title='LoginScreen' />
            <Scene key='Feed' component={Feed} title='Feed' />
            <Scene key='Contacts' component={Contacts} title='Contacts' />
            <Scene key='cameraView' component={CameraView} title='CameraView' />
            <Scene key='QuestionInspector' component={QuestionInspector} title={'QuestionInspector'} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
