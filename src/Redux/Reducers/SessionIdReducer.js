const sessionIdReducer = (state = '', action) => {
    switch(action.type){
        case 'updateSessionId': return action.payload;
        default: return state;
    }
}

export default sessionIdReducer;