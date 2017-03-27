import React from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'
import ContactsView from '../Components/ContactsView'
import ContactsActions from '../Redux/ContactsRedux'


// Styles
import styles from './Styles/ContactsStyle'

class Contacts extends React.Component {

  state: {
    dataSource: Object,
    contacts: [],
    selected: []
  }

  constructor (props) {
    super(props)

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      {nameFirst: 'Jacquin', nameLast: 'Smith'},
      {nameFirst: 'Ian', nameLast: 'Smith'},
      {nameFirst: 'Jess', nameLast: 'Smith'},
      {nameFirst: 'Konst', nameLast: 'Smith'},
      {nameFirst: 'Silva', nameLast: 'Smith'},
      {nameFirst: 'Mike', nameLast: 'Smith'},
      {nameFirst: 'Maria', nameLast: 'Smith'}
    ]

    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    console.log('contactsContainer pre state');
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      selected: []
    }
    console.log('in contactsContainer constructor')
    this.handleSelected = this.handleSelected.bind(this)
    this._renderRow = this._renderRow.bind(this)
  }

  handleSelected (name) {
    const selected = Array.from(this.state.selected)
    const nameIndex = selected.indexOf(name)
    if (nameIndex === -1) {
      selected.push(name)
    } else {
      selected.splice(nameIndex, 1)
    }
    this.setState({
      selected: selected
    })
  }

  handleDone = () => {
    const respondents = this.state.selected
    this.props.setResponders(respondents)
  }


  _renderRow (rowData) {
    return (
      <ContactsView
        first={rowData.nameFirst}
        last={rowData.nameLast}
        clickChange={this.handleSelected}
        empty='empty'
      />
    )
  }


  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    fetching: state.userContacts.fetching,
    contacts: state.userContacts.contacts,
    selected: state.question.respondents
    // doesn't exist on login state yet, but I think this is where we should grab contacts/friends
    // contacts: state.login.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setResponders: respondents => dispatch(ContactsActions.responedntRequest(respondents))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)