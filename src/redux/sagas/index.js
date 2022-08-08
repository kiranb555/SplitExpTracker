import { all, call } from 'redux-saga/effects';
import getInitialData from './getData.saga';

export default function* rootSaga() {
    yield all([
        call(getInitialData)
    ]);
}
