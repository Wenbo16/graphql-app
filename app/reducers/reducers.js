// import { STARTING_REQUEST } from '../actions/actions';
// import { FINISHED_REQUEST } from '../actions/actions';
const immutableState = {
	fetching: false,
	data: null
}

export const queryReducer = (state = immutableState, action) => {
  switch (action.type) {
	case "STARTING_REQUEST":
	  return { fetching: true, data: null }
	case "FINISHED_REQUEST":
		return { fetching: false, data: action.response.data.getOneGoldberg }
	default:
	  return state
  }
}
