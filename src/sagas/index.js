
import {fork} from "redux-saga/effects";
import customerSaga from './customerSaga';
import productSaga from './productSaga';
import contractSaga from './contractSaga';
import profileSaga from './profileSaga';


export default function* rootSaga() {
    yield fork(customerSaga)
    yield fork(productSaga)
    yield fork(contractSaga)
    yield fork(profileSaga)
  }