import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/ContactsViewStyle'

export default class ContactsView extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>ContactsView Component</Text>
      </View>
    )
  }
}

// needs to update it's container when new contact is selected
// need a checkbox

// // Prop type warnings
// ContactsView.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ContactsView.defaultProps = {
//   someSetting: false
// }
