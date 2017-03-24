import React from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'


class Feed extends React.Component{
	render(){
		return(
			<ListView >
				{props.feed.map((question) => {
					return (<QuestionView 
						text={question.title} 
						left={question.leftText} 
						right={question.rightText} />)
				})}
			</ListView>
			)
	}
}

function mapStateToProps(state){
	return {
		feed: state.feed
	}
}
function mapDispatchToProps(dispatch){
	//Nothing goes in here for now
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)