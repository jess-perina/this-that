import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({

  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.eggplant,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    height: 40,
    fontWeight: 'bold',
    color: Colors.snow,
    textAlign: 'center',
    marginTop: 250
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  question: {
    height: 35,
    borderColor: '#16FFDC',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
    marginBottom: -5,
    color: 'white',
    zIndex: 0
  },
  imageContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: -1
  },
  optionsContainer: {
    height: 400,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 0,
    borderColor: '#16FFDC',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  options: {
    width: 176,
    height: 287
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submit: {
    height: 20
  }
})

