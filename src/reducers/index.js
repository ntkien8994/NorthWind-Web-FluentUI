import {combineReducers} from 'redux';
import { layouts } from './layoutReducer';
import {customers} from './customerReducer';
import {products} from './productReducer';
import {contracts} from './contractReducer';
import {profiles} from './profileReducer';

let reducers= combineReducers({layouts,customers,products,contracts,profiles});
export default reducers;