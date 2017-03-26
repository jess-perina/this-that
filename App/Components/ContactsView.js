import React from 'react'
import { Text } from 'react-native'
import styles from './Styles/ContactsViewStyle'
import CheckBox from 'react-native-check-box'

export default class ContactsView extends React.Component {

  render () {
    console.log(this.props)
    let contactName = <Text style={styles.label}>{`${this.props.first} ${this.props.last}`}</Text>
    return (
      <CheckBox
        style={{ flex: 1, padding: 10, backgroundColor: 'pink' }}
        rightText={contactName}
        checked
        onClick={() => this.props.onClickChange(contactName)}
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
