import React, { Component } from 'react'
import { Scene, Router, Modal, Actions } from 'react-native-router-flux'
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
import AnswerModal from '../Containers/AnswerModal'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='modal' component={Modal}>
          <Scene key='drawer' component={NavigationDrawer} open={false}>
            <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
              <Scene key='questionForm' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={QuestionForm} title='This/That' />
              <Scene key='myQuestions' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={MyQuestions} title='This/That' />
              <Scene initial key='loginScreen' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={LoginScreen} title='This/That' />
              <Scene key='Feed' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={Feed} title='Feed' />
              <Scene key='Contacts' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={Contacts} title='This/That' />
              <Scene key='QuestionInspector' hideBackImage onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={QuestionInspector} title='This/That' />
              <Scene key='cameraView' onRight={() => { Actions.loginScreen() }} rightTitle='Logout' rightButtonTextStyle={Styles.rightButton} component={CameraView} title='This/That' />
            </Scene>
          </Scene>
          <Scene key='AnswerModal' component={AnswerModal} title='AnswerModal' />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
