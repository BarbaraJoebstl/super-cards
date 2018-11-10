import { RECEIVE_ALL_DECKS, ADD_NEW_DECK, ADD_NEW_QUESTION } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_DECKS: {
            return {
                ...state,
                ...action.decks
            }
        }
        case ADD_NEW_DECK:
            return {
                ...state,
                [action.deck.id]: {
                    title: action.deck.title,
                    questions: action.deck.questions
                }
            }
        case ADD_NEW_QUESTION: {
            return {
                ...state,
                [action.question.deckId]: {
                    title: action.question.deckTitle,
                    questions: [
                        ...state[action.question.deckId].questions,
                        { ...action.question.questions }
                    ]
                }
            }
        }    
        default: {
            return state
        }
    }
}

export default decks