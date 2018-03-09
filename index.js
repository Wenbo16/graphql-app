import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { queryReducer } from "./app/reducers/reducers.js";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { QueryContainer } from "./app/components/Query.js";


const store = createStore(
	queryReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

);


class Main extends React.Component {
	render() {
		return (
		  	<div>
		      	<QueryContainer/>
		    </div>
		)
	}
}
export default Main;


ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>, 
	document.getElementById('example')
);