import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.screenHeight,
    width: Metrics.screenWidth,
    top: 120,
    position: 'absolute',
    backgroundColor: Colors.background
  },
  form: {
    height: 400,
    marginTop: 100
  },
  cancelButton: {
    width: Metrics.screenWidth,
    marginBottom: 10
  },
  submitButton: {
    width: Metrics.screenWidth
  },
  answerInput: {
    height: 150,
    width: Metrics.screenWidth,
    color: Colors.snow
  }
})
