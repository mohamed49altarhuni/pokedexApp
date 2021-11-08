const PokeDetailsReducer = (state=[], action)=>{
    switch(action.type){
        case 'AddDetails':
            return  state =  action.PokeDetails
        default:
            return state
    }
}

export default PokeDetailsReducer;