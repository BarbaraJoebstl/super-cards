export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function receiveAllDecks(decks) {
    return {
        type: RECEIVE_ALL_DECKS,
        decks
    }
}

export function addNewDeck(deck) {
    return {
      type: ADD_NEW_DECK,
      deck
    }
  }

export function addNewQuestion(question){
    return {
        type: ADD_NEW_QUESTION,
        question
    }

}  
  