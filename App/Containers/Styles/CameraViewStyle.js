import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.titlePadding
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 10,
    margin: 40
  },
  buttonBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 5
  },
  buttonText: {
    color: '#FFFFFF'
  }
})
