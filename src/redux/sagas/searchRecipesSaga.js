import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRecipes(action) {
  try {
    const input = action.payload.input;
    const typeMeal= action.payload.typeMeal
    console.log('input from saga',input,typeMeal)

    const response = yield axios.get(`/api/searchRecipes/${input}/${typeMeal}`)
    yield put({
      type: 'SET_RECIPES',
      payload: response.data

    });
    console.log('-------->from fetchAutoCompleteRecipesSaga',response.data)

  } catch (error) {
    console.log('Search recipes title is error:', error);
  }
}

function* searchRecipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
}

export default searchRecipesSaga;