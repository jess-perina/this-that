import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import FeedQuestionAnswered from '../Components/FeedQuestionAnswered'
import PieChart from 'react-native-pie-chart'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/QuestionInspectorStyle'
import QuestionInspectorActions from '../Redux/QuestionInspectorRedux'

class QuestionInspector extends React.Component {

  render () {
    console.log(this.props)
    const {leftText, rightText, leftVotes, rightVotes, title, leftImage, rightImage} = this.props.question
    const asker = this.props.owner

    let chart = null
    if (leftVotes && rightVotes) {
      chart = (<PieChart
        chart_wh={100}
        series={[rightVotes, leftVotes]}
        sliceColor={['#B22A03', '#FFB159']}
                            />)
    } else if (leftVotes === 0 && rightVotes === 0) {
      chart = (<Text>NO VOTES YET </Text>)
    } else {
      if (leftVotes) {
        chart = (<PieChart
          chart_wh={100}
          series={[leftVotes]}
          sliceColor={['#FFB159']}
                            />)
      } else {
        chart = (<PieChart
          chart_wh={100}
          series={[rightVotes]}
          sliceColor={['#B22A03']}
                            />)
      }
    }
    console.log(chart)
    return (
      <View style={styles.container}>
        <FeedQuestionAnswered
          text={title}
          leftQ={leftText}// + ': ' + this.state.leftVotes}
          rightQ={rightText}// + ': ' + this.state.rightVotes}
          rightImage={rightImage}
          leftImage={leftImage}
          leftVotes={leftVotes}
          rightVotes={rightVotes}
          details={false}
          asker={asker}
        />
        <View style={{alignItems: 'center', marginBottom: 20}}>
          {chart}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questionInspector.payload.question,
    answersPerUser: state.questionInspector.payload.answersPerUser,
    owner: state.questionInspector.payload.owner.name
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     goGetTheQuestion: () => {
//       dispatch(QuestionInspectorActions.questionInspectorRequest())
//     }
//   }
// }

export default connect(mapStateToProps)(QuestionInspector)

// const {leftText, rightText, leftVotes, rightVotes, title, leftImage, rightImage} = this.state.question
//     const chart = null
//     if (leftVotes && rightVotes) {
//       (<PieChart
//         chart_wh={100}
//         series={[rightVotes, leftVotes]}
//         sliceColor={['#F44336', '#2196F3']}
//                             />)
//     } else if (leftVotes || rightVotes) {
//       (<PieChart
//         chart_wh={100}
//         series={[10000 * rightVotes + 1, 10000 * leftVotes + 1]}
//         sliceColor={['#F44336', '#2196F3']}
//                             />)
//     } else { (<Text>NO VOTES YET </Text>) }

//     return (
//       <View>
//         <View style={styles.container}>
//           <FeedQuestionAnswered
//             text={title}
//             leftQ={leftText}// + ': ' + this.state.leftVotes}
//             rightQ={rightText}// + ': ' + this.state.rightVotes}
//             leftImage={leftImage}
//             rightImage={rightImage}
//             leftVotes={leftVotes}
//             rightVotes={rightVotes}
//             // asker={asker}
//           />
//         </View>
//         <View style={{marginTop: 5}}>
//           <Text style={styles.boldLabel} >{title}</Text>
//           {chart}
//         </View>
//         <View />
//       </View>
//     )
