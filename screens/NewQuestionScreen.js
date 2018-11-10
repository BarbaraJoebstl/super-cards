import React from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { saveNewQuestion } from '../utils/helper';
import { addNewQuestion } from '../store/actions/index';
import { connect } from 'react-redux';

class NewQuestionScreen extends React.Component {

    static navigationOptions = () => {
        return {
            headerTitle: "Add Question for ..."
        }
    }

    state = { question: '', answer: '' }

    handleSubmit() {
        let key = this.props.deckId
        let question = this.state.question
        let answer = this.state.answer
        let questions = [{ question, answer }]

        saveNewQuestion({key, questions})

        this.props.addNewQuestion(key, questions)

        this.setState(() => ({ question: '', answer: '' }))
        this.props.navigation.goBack()
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <View >
                    <TextInput
                        onChangeText={(question) => this.setState({ question })}
                        value={this.state.text}
                        placeholder='question'
                    />
                    <TextInput
                        onChangeText={(answer) => this.setState({ answer })}
                        value={this.state.text}
                        placeholder='answer'
                    />
                    <TouchableOpacity
                        onPress={() => this.handleSubmit()}>
                        <Text>Add</Text>
                    </TouchableOpacity>
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
        addNewQuestion: (key, questions) => dispatch(addNewQuestion({title: key, questions })),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionScreen);