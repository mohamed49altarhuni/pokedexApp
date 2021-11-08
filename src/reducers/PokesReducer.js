const PokesReducer = (state=[], action)=>{
    switch(action.type){
        case 'Add':
            return  state=  action.Pokes
        case 'LoadMore':
            return  [...state, ...action.Pokes]
        
        default:
            return state
    }
}

export default PokesReducer;