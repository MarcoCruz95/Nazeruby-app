const isFetchingTokenReducer = (state=false, action) => {
    switch(action.type){
        case 'isFetchingToken' : return action.payload;
        default : return state;
    }
}

export default isFetchingTokenReducer;