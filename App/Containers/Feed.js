import React from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import QuestionView from '../Components/QuestionView'

class Feed extends React.Component{
	render(){
		console.log(this.props)
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
		feed: state.feed.feed 	//Not sure why state.feed comes back as an object here
	}
}
// function mapDispatchToProps(dispatch){
// 	//Nothing goes in here for now
// }

export default connect(mapStateToProps)(Feed)