import React from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import FeedQuestionView from './FeedQuestionView'
import FeedActions from '../Redux/FeedRedux'

class Feed extends React.Component {
  componentDidMount () {
    this.props.grabFeed(this.props.userId)
  }
  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return (
      <ListView dataSource={ds.cloneWithRows(this.props.feed)} renderRow={(question) => {
        return (<FeedQuestionView
          question={question}
          userId={this.props.userId} />)
      }} />
    )
  }
}

function mapStateToProps (state) {
  return {
    feed: state.feed.feed,
    userId: state.login.userId
  }
}
function mapDispatchToProps (dispatch) {
  return {
    grabFeed: (userId) => { dispatch(FeedActions.feedRequest(userId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
