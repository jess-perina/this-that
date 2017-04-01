import React from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import FeedQuestionView from './FeedQuestionView'
import FeedActions from '../Redux/FeedRedux'
import QuestionInspectorActions from '../Redux/QuestionInspectorRedux'

import MainNav from '../Navigation/MainNav'

import styles from './Styles/QuestionFormStyle'

class RandomFeed extends React.Component {

  componentDidMount () {
    console.log('random feed mounted')
    this.props.grabRandomFeed(this.props.userId)
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return (
      <ListView
        style={styles.container}
        renderHeader={() => <MainNav />}
        dataSource={ds.cloneWithRows(this.props.feed)}
        renderRow={(question) => {
          return (
            <FeedQuestionView
              question={question}
              userId={this.props.userId}
              goGetTheQuestion={this.props.goGetTheQuestion}
            />
          )
        }}
      />
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
    grabRandomFeed: (userId) => {
      console.log('grabbing random feed')
      dispatch(FeedActions.randomFeedRequest(userId))
    },
    goGetTheQuestion: (questionId) => {
      dispatch(QuestionInspectorActions.questionInspectorRequest(questionId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomFeed)

