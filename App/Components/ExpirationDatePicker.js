import React from 'react'
import { Text, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import styles from './Styles/ExpirationDatePickerStyle'
import {Colors} from '../Themes'

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
    return (
      <View>
        <DatePicker
          style={{width: 200, marginLeft: 85}}
          date={this.props.date}
          time={this.props.time}
          mode='datetime'
          placeholder='Expires'
          format='MM-DD-YYYY, h:mm a'
          minDate={this.props.date}
          maxDate='2016-06-01'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          showIcon={false}
          customStyles={[styles.dateInput, styles.dateIcon]}
          onDateChange={this.handleDateChange}
        />
        <Text style={{color: Colors.snow, textAlign: 'center'}}>Expires</Text>
      </View>
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
