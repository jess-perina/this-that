import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    top: 120,
    position: 'absolute',
    backgroundColor: Colors.background
  },
  answerInput: {
    height: 150,
    width: Metrics.screenWidth,
    color: Colors.snow
  }
})
