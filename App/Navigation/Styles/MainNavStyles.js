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
    backgroundColor: Colors.background,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    color: 'white'
  },
  selectedRow: {
    flex: 1,
    backgroundColor: Colors.background,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    color: 'white',
    textDecorationLine: 'underline',
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  optionsContainer: {
    height: 300,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  options: {
    width: 175,
    height: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 1
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

