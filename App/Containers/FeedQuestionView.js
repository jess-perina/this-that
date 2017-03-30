'use strict'

import React from 'react'
import QuestionView from '../Components/QuestionView'
import axios from 'axios'
import { View } from 'react-native'
import FeedQuestionAnswered from '../Components/FeedQuestionAnswered'
import { Actions } from 'react-native-router-flux'

export default class FeedQuestionView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      myVote: props.question.myVote,
      leftVotes: props.question.leftVotes,
      rightVotes: props.question.rightVotes,
      answerOptionsModal: false,
      myVotePreSubmit: null
    }
    this.onClickLeft = this.onClickLeft.bind(this)
    this.onClickRight = this.onClickRight.bind(this)
    this.onClickSubmitModal = this.onClickSubmitModal.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      myVote: nextProps.question.myVote,
      leftVotes: nextProps.question.leftVotes,
      rightVotes: nextProps.question.rightVotes,
      myVotePreSubmit: null
    })
  }
  // -------------------------------------------
  // Functions START HERE
  // -------------------------------------------

  onClickSubmitModal () {
    const vote = this.state.myVotePreSubmit
    return axios.post(`https://socketsynth.ngrok.io/api/question/${this.props.question.id}`, { vote: vote, comment: '', respondentId: this.props.userId })
    .then(() => {
      let leftVotes = 0
      let rightVotes = 0
      if (vote === 'right') {
        rightVotes = this.state.rightVotes + 1
        leftVotes = this.state.leftVotes
      } else {
        rightVotes = this.state.rightVotes
        leftVotes = this.state.leftVotes + 1
      }
      this.setState({myVote: vote, leftVotes: leftVotes, rightVotes: rightVotes})
    })
    .catch((error) => console.log(error))
  }

  onClickLeft () {
    console.log('left click')
    this.setState({myVotePreSubmit: 'left'})
    Actions.AnswerModal({modal: true})
  }
  onClickRight () {
    console.log('right click')
    this.setState({myVotePreSubmit: 'right'})
    Actions.AnswerModal({modal: true})
  }

  render () {
    const { title, leftText, rightText, asker } = this.props.question     // TODO: DISPLAY ASKER NAME    // leftVotes, rightVotes,
    console.log(this.state)
    if (this.state.myVote) {
      return (
        <View>
          <FeedQuestionAnswered
            text={title}
            leftQ={leftText}// + ': ' + this.state.leftVotes}
            rightQ={rightText}// + ': ' + this.state.rightVotes}
            leftVotes={this.state.leftVotes}
            rightVotes={this.state.rightVotes}
            asker={asker}
            />
        </View>
      )
    } else {
      return (
        <QuestionView
          text={title}
          left={leftText}
          right={rightText}
          asker={asker}
          onClickLeft={this.onClickLeft}
          onClickRight={this.onClickRight} />

      )
    }
  }
}

// <View>
//                        <Text >Add A Comment</Text>
//                        <Text onPress={this.modalCancel} > CANCEL </Text>
//                        <Text onPress={this.onClick}> Submit </Text>
//                      </View>
//           </Modal> */}

