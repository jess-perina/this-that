import React from 'react'
import { Text } from 'react-native'
import styles from './Styles/ContactsViewStyle'
import CheckBox from 'react-native-check-box'

export default class ContactsView extends React.Component {

  render () {
    const name = `${this.props.first} ${this.props.last}`
    let contactName = <Text style={styles.label}>{name}</Text>

    return (
      <CheckBox
        style={{ flex: 1, padding: 10, backgroundColor: 'pink' }}
        rightText={contactName}
        checked={false}
        onClick={(event) => { this.props.clickChange(name) }}
      />
    )
  }
}

// needs to update it's container when new contact is selected

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
