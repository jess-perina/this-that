import React from 'react'
import DatePicker from 'react-native-datepicker'
import styles from './Styles/ExpirationDatePickerStyle'

export default class ExpirationDatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (date, time) {
    time = time.toTimeString('en-US', { timeZone: 'UTC', timeZoneName: 'short' })
    this.props.onConfirm(date, time)
  }

  render () {
    console.log('props---', this.props)
    return (
      <DatePicker
        style={{width: 200}}
        date={this.props.date}
        time={this.props.time}
        mode='datetime'
        placeholder='select date'
        format='MM-DD-YYYY'
        minDate={this.props.date}
        maxDate='2016-06-01'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        customStyles={[styles.dateInput, styles.dateIcon]}
        onDateChange={this.handleDateChange}
      />
    )
  }
}

// // Prop type warnings
// ExpirationDatePicker.propTypes = {
//   customStyles: React.PropTypes.array,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ExperationDatePicker.defaultProps = {
//   someSetting: false
// }
