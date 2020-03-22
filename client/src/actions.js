export const FETCH_LIST = 'FETCH_LIST';
export const ADD_PHRASE = 'ADD_PHRASE';

export const addPhraseAction = (phrase) => {
  return {
      type: ADD_PHRASE,
      phrase: phrase
  }
}