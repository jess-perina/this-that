'use strict'

import React from 'react'
import QuestionView from '../Components/QuestionView'
import axios from 'axios'
import {View} from 'react-native'
import FeedQuestionAnswered from '../Components/FeedQuestionAnswered'

export default class FeedQuestionView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      myVote: props.question.myVote,
      leftVotes: props.question.leftVotes,
      rightVotes: props.question.rightVotes
    }
    this.onClickLeft = this.onClickLeft.bind(this)
    this.onClickRight = this.onClickRight.bind(this)
  }
  onClickLeft () {
    return axios.post(`https://socketsynth.ngrok.io/api/question/${this.props.question.id}`, { vote: 'left', comment: '', respondentId: this.props.userId })
    .then(() => {
      console.log('We made it, b')
      this.setState({myVote: 'left', leftVotes: this.state.leftVotes + 1})
    })
    .catch((error) => console.log(error))
  }
  onClickRight () {
    return axios.post(`https://socketsynth.ngrok.io/api/question/${this.props.question.id}`, { vote: 'right', comment: '', respondentId: this.props.userId })
    .then(() => {
      this.setState({myVote: 'right', rightVotes: this.state.rightVotes + 1})
    })
    .catch((error) => console.log(error))
  }

  render () {
    const { title, leftText, rightText, asker } = this.props.question         // leftVotes, rightVotes,

    if (this.state.myVote) {
      return (
        <View>
          <FeedQuestionAnswered
            text={title}
            leftQ={leftText}// + ': ' + this.state.leftVotes}
            rightQ={rightText}// + ': ' + this.state.rightVotes}
            leftVotes={this.state.leftVotes}
            rightVotes={this.state.rightVotes}
            />
        </View>
      )
    } else {
      return (
        <View>
          <QuestionView
            text={title}
            left={leftText}
            right={rightText}
            onClickLeft={this.onClickLeft}
            onClickRight={this.onClickRight} />
        </View>
      )
    }
  }
}
