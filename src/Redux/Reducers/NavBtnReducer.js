const navBtnReducer = (state = 'home', action) => {
    switch(action.type){
        case 'updateNavBtn' : return action.payload;
        default : return state;
    }
}

export default navBtnReducer;