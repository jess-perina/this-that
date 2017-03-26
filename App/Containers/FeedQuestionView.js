'use strict'

import React from 'react'
import QuestionView from '../Components/QuestionView'
import axios from 'axios'
import {View} from 'react-native'
export default class FeedQuestionView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      myVote: props.question.myVote
    }
    this.onClickLeft = this.onClickLeft.bind(this)
    this.onClickRight = this.onClickRight.bind(this)
  }
  onClickLeft () {
    return axios.post(`https://socketsynth.ngrok.io/api/question/${this.props.question.id}`, { vote: 'left', comment: '', respondentId: this.props.userId })
    .then(() => {
      this.setState({myVote: 'left'})
    })
    .catch((error) => console.log(error))
  }
  onClickRight () {
    return axios.post(`https://socketsynth.ngrok.io/api/question/${this.props.question.id}`, { vote: 'right', comment: '', respondentId: this.props.userId })
    .then(() => this.setState({myVote: 'right'}))
    .catch((error) => console.log(error))
  }

  render () {
    const {title, leftText, rightText} = this.props.question //, leftVotes, rightVotes, myVote, asker, id
    if (this.state.myVote) {
      return (
        <View>
          <QuestionView
            text={'title'}
            left={'leftText'}
            right={'rightText'}
            onClickLeft={() => { return }}
            onClickRight={() => { return }} />
        </View>
      )
    } else {
      return (<View>
        <QuestionView
          text={title}
          left={leftText}
          right={rightText}
          onClickLeft={this.onClickLeft}
          onClickRight={this.onClickRight} />
      </View>)
    }
  }
}
