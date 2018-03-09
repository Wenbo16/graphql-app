import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';

class Query extends React.Component {
	componentDidMount(){
		console.log(this.props);
	    this.props.dispatch(
	      	getGraph(`{
	      		getOneGoldberg(id: 2) {
	      			id, 
	      			character, 
	      			actor
	      		}
	      	}`)
	    );
  	}
	
	render() {
		console.log(this.props.queryData);
	    let fetchInProgress = this.props.queryData.fetching;
	    let queryText;
	    let goldberg = this.props.queryData.data;
		return (
		  	<div>
		  		{
			  	goldberg && <div>
			        <p>Fetch in progress: {fetchInProgress}</p>
			        <h3>{ goldberg.character }</h3>
			        <p>{ goldberg.actor }</p>
			        <p>{ goldberg.role }</p>
			        <p>{ goldberg.traits }</p>
			        <input ref={node => {queryText = node}}></input>
			        <button onClick={() => {
			          this.props.dispatch(getGraph(queryText.value))}
			        }>
		          	query
			        </button>
			    </div>
				}
		 	</div>
		)
	}
}



// const mapStateToProps = (state) => {
//     return {
//     	// users : state.users.users
//         store: state
//     }
// };

function mapStateToProps(state){
    return {
	    queryData: state
	}
}

export const QueryContainer = connect(mapStateToProps)(Query);
