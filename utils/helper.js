import { AsyncStorage } from 'react-native'

const CARDS_STORAGE_KEY = 'cards:decks'
const CARDS_USER_KEY = 'cards:users'

const defaultDecks = {
[1]: {
      title: "React",
      questions: [
        {
          question: "What React function allows you to render the content to be displayed?",
          answer: "render()"
        }
      ]
    },
    [2]:{
        title: "Angular",
        questions: [
            {
              question: "ng 1",
              answer: "render()"
            },
            {
                question: "ng 2",
                answer: "render()"
              },
        ]
    },
    [3]: {
        title: "VueJS",
        questions: [
            {
              question: "Vue1",
              answer: "render()"
            },
            {
                question: "Vue2",
                answer: "render()"
              },
              {
                question: "Vue3",
                answer: "render()"
              }
        ]
    },
  }
  

export function getDecks() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      if (!results) {
        setDefaultDecks();
        getDecks();
      }
      else {
        return  JSON.parse(results);
      }
    })
}

export function saveNewDeck(key, entry) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
    }))
  }
  
export function saveNewQuestion({key, questions}) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
    let currentQuestions = JSON.parse(result)[key].questions
    let updatedQuestions = [...currentQuestions, ...questions]
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
      [key]: {
        questions: updatedQuestions
      }
    }))
  })
}

function setDefaultDecks() {
    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(defaultDecks))
}