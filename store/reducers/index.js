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
                ...action.deck
            }
        case ADD_NEW_QUESTION: {
            return {
                ...state,
                [action.deck.title]: {
                    title: action.deck.title,
                    questions: [
                        ...state[action.deck.title].questions,
                        { ...action.questions }
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