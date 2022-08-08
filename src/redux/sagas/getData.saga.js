import { takeEvery, put } from "redux-saga/effects";
import { getData, loader, setData } from "../actions/getData";

export function* watchGetInitialData(action) {
  try {
    yield put(loader(true));
    // const response = yield call(
    //   getPortfolioAllData,
    //   "/portfolio?secret=kiranPortfolio"
    // );
      const response = [
          {
          name: 'ather',
          age: 22
            },
          {
              name: "brad",
              age : 35
          },
          {
              name: "charlie",
              age : 28
          }
      ];
    yield put(setData(response));
  } catch (error) {
    yield put(setData([]));
  } finally {
    yield put(loader(false));
  }
}

export default function* getInitialData() {
  yield takeEvery(getData, watchGetInitialData);
}
