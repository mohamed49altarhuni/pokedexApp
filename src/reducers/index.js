import {combineReducers} from 'redux';

import PokesReducer from './PokesReducer';
import PokeDetailsReducer from './PokeDetailsReducer';

export default combineReducers({
  
    PokesReducer,
    PokeDetailsReducer
});