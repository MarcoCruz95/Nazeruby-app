const userInfReducer = (state = {}, action) => {
    switch(action.type){
        case 'updateUserInf': return action.payload;
        default: return state;
    }
}

export default userInfReducer;