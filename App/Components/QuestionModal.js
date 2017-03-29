import React from 'react'
import { View, Text, Modal } from 'react-native'
import styles from './Styles/QuestionModalStyle'

export default class QuestionModal extends React.Component {

  render () {
    console.log('CLICKED')
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.answerOptionsModal}>
          <View>
            <Text >Add A Comment</Text>
            <Text onPress={this.props.modalCancel} > CANCEL </Text>
            <Text onPress={this.props.onClick}> Submit </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

// props--onClick, modalCancel answerOptionsModal
// () => { this.setState({answerOptionsModal: false}) }
// // Prop type warnings
// QuestionModal.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// QuestionModal.defaultProps = {
//   someSetting: false
// }
