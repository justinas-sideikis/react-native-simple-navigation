const initState = []; 

export default function(state = initState, action) {
    switch(action.type) {
        case 'ADD_ELEMENT':
            return [...state, { name: action.payload, watched: false}];
        case 'CHANGE_ELEMENT_fLAG':
            return state.map((movie) => {
                return movie.name === action.payload ? { name: movie.name, watched: !movie.watched } : movie;
            })
        case 'REMOVE_ELEMENT':
            return state.filter(movie => movie.name !== action.payload);
        default:
            return state;
    }
}