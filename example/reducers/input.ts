const initState = "";

export default function(state = initState, action) {
    switch(action.type){
        case 'SET_INPUT':
            return action.payload;
        case 'REMOVE_INPUT':
            return initState;
        default:
            return state;
    }
}