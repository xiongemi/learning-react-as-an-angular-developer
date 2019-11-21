import { call, put, takeLatest, select } from 'redux-saga/effects';

import { ApiUrls } from '../../types/api-urls.const';

import { FETCH_GAMES, fetchGamesFailed, fetchGamesSuccess } from './game.actions';
import { getGames } from './game.selectors';

function* fetchGames() {
  try {
    let games = yield select(getGames);
    if (games.length) {
      yield put(fetchGamesSuccess(games));
      return;
    }
    const response = yield call(fetch, ApiUrls.games, {
      method: 'GET',
    });
    games = yield response.json();
    yield put(fetchGamesSuccess(games));
  } catch (error) {
    yield put(fetchGamesFailed(error));
  }
}

export function* gameSagas() {
  yield takeLatest(FETCH_GAMES, fetchGames);
}
