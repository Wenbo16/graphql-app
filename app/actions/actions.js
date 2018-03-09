export const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
}

export const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response : response
  }
}

export const getGraph = (payload) => {
    return dispatch => {
    	dispatch(startingRequest());
        return  fetch('/graphql', {
        				method: 'POST',
			            cache: false,
			            headers: {
			                'Accept': 'application/graphql',
			                'Content-Type': 'application/graphql'
			            },
			            body : payload
        			})
            		.then(resp => resp.json())
           			.then(resp_json => {
                		dispatch(finishedRequest(resp_json))
            		})
    };
}

// export const getGraph = (payload) => {
//   return dispatch => {
//     dispatch(startingRequest());
//     return new Promise(function(resolve, reject) {
//       let request=new XMLHttpRequest();
//       request.open("POST", "/graphql", true);
//       request.setRequestHeader("Content-Type", "application/graphql");
//       request.send(payload);
//       request.onreadystatechange = () => {
//         if (request.readyState === 4) {
//           	resolve(request.responseText)
//         }
//       }
//     }).then(response => {
//     	dispatch(finishedRequest(JSON.parse(response)))
//     })
//   }
// }