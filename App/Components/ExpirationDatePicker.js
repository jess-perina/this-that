import React from 'react'
import DatePicker from 'react-native-datepicker'
import styles from './Styles/ExpirationDatePickerStyle'

export default class ExpirationDatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {date: '2016-05-15'}
  }

  render () {
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode='date'
        placeholder='select date'
        format='YYYY-MM-DD'
        minDate='2016-05-01'
        maxDate='2016-06-01'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { this.setState({date: date}) }}
      />
    )
  }
}

// // Prop type warnings
// ExperationDatePicker.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ExperationDatePicker.defaultProps = {
//   someSetting: false
// }
