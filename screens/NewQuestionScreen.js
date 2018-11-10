import React from 'react'
import { View, KeyboardAvoidingView, TextInput } from 'react-native'
import { saveNewQuestion } from '../utils/helper'
import { addNewQuestion } from '../store/actions/index'
import { connect } from 'react-redux'
import TextButton from '../components/TextButton'
import {styles} from '../constants/Style'


class NewQuestionScreen extends React.Component {

    static navigationOptions = () => {
        return {
            headerTitle: "Add Question for ..."
        }
    }

    state = { question: '', answer: '' }

    handleSubmit() {
        let key = this.props.deckId
        console.log(key)
        let question = this.state.question
        let answer = this.state.answer
        let questions = [{ question, answer }]

        let entry_for_store = {
            deckId: this.props.deckId,
            deckTitle: this.props.deck.title,
            questions: [{ question, answer }] 
        }
        saveNewQuestion({key, questions})
        this.props.addNewQuestion(entry_for_store)

        this.setState(() => ({ question: '', answer: '' }))
        this.props.navigation.navigate('Deck', { deck: this.props.deck, id: key })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.text}
                        placeholder='question'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(answer) => this.setState({ answer })}
                        value={this.state.text}
                        placeholder='answer'
                    />
                    <TextButton 
                    style={styles.primaryButton}
                    onPress={() => this.handleSubmit()}>
                        Add new Question
                    </TextButton>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        deckId: props.navigation.state.params.deckId,
        deck: state[props.navigation.state.params.deckId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewQuestion: (entry) => dispatch(addNewQuestion(entry)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionScreen);