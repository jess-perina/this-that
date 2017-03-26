import React from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import QuestionView from '../Components/QuestionView'
import FeedActions from '../Redux/FeedRedux'

class Feed extends React.Component{
	componentDidMount () {
    this.props.grabFeed(this.props.userId)
  }
	render(){
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return(
			<ListView dataSource={ds.cloneWithRows(this.props.feed)} renderRow={(question) => {
					return (<QuestionView 
						text={question.title} 
						left={question.leftText} 
						right={question.rightText} />)
				}} />
			)
	}
}

function mapStateToProps(state){
	return {
		feed: state.feed.feed,
		userId: state.login.userId
	}
}
function mapDispatchToProps(dispatch){
	return {
		grabFeed: (userId) => { dispatch(FeedActions.feedRequest(userId)) }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Feed)