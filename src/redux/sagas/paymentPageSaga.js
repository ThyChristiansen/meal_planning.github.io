import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
const moment = require("moment");



function* fetchPayment(action) {
  try {
    
    const response = yield axios.get(`/payment/general-payment/${action.payload.date}`)
    yield put({
      type: 'SET_PAYMENT',
      payload: response.data
    });
    // console.log('----------->',response.data)
  } catch (error) {
    console.log('Payment is error:', error);
  }
}

function* addPayment(action) {
  try {
    // console.log('addPayment from saga', action.payload)
    let dateAfterFormat = action.payload.date
    yield axios.post(`/payment`, action.payload);
    // console.log(action.payload)
    yield put({
      type: 'FETCH_PAYMENT',
      payload: {date:dateAfterFormat}
    });
  } catch (error) {
    console.log('addPayment is error:', error);
  }
}

function* fetchTotalPaymentByMonth(action) {
  try {
    const response = yield axios.get(`/payment/totalPayment/${action.payload}`)
    // console.log('----------->', action.payload)
    yield put({
      type: 'GET_TOTAL_PAYMENT_BY_MONTH',
      payload: response.data
    });
  } catch (error) {
    console.log('fetchTotalPaymentByMonth is error:', error);
  }
}

function* paymentPageSaga() {
  yield takeLatest('ADD_PAYMENT', addPayment);
  yield takeLatest('FETCH_PAYMENT', fetchPayment);
  yield takeLatest('EDIT_PAYMENT', editPayment);
  yield takeLatest('FETCH_TOTAL_PAYMENT_BY_MONTH', fetchTotalPaymentByMonth);

}

export default paymentPageSaga;