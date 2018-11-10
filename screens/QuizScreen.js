import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import TextButton from '../components/TextButton';
import { clearNotification, setNotification } from '../utils/notifications';
import { styles } from '../constants/Style'

class QuizScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.state.params.title,
        }
    }

    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        showQuestion: true,
        showResults: false
    }

    toggleView() {
        this.setState(previousState => ({ showQuestion: !previousState.showQuestion }))
    }

    calcRemaining() {
        return this.props.questions.length - this.state.currentQuestion
    }

    handleAnswer(answer) {
        if (answer === 'correct') {
            this.setState((previousState) => ({ correctAnswers: previousState.correctAnswers + 1 }))
        }

        clearNotification()
            .then(setNotification)

        this.showNextQuestion();
    }

    showNextQuestion() {
        if (this.state.currentQuestion === this.props.questions.length - 1) {
            this.setState({ showResults: true })
        } else {
            this.setState((previousState) => ({
                currentQuestion: previousState.currentQuestion + 1
            }))
        }
    }

    calcPercentage() {
        return (this.state.correctAnswers / this.props.questions.length) * 100
    }

    replay() {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            showQuestion: true,
            showResults: false
        })
    }

    render() {
        let question = `🤔 ${this.props.questions[this.state.currentQuestion].question}?`
        let answer = `🤓 ${this.props.questions[this.state.currentQuestion].answer}`
        const navigate = this.props.navigation.navigate

        return (this.state.showResults === false) ? (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.smallText}> {this.calcRemaining()} Questions to go!
                    </Text>
                    </View>
                    <View style={styles.flipCardA}>
                        <TouchableOpacity onPress={() => this.toggleView()}>
                            <View>
                                <Text style={styles.bigText}>
                                    {this.state.showQuestion ? question : answer}
                                </Text>
                                <Text style={styles.smallText}>
                                    {this.state.showQuestion ? 'tap to show answer' : ' tap to show question'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TextButton
                        style={styles.primaryButton}
                        onPress={() => this.handleAnswer('correct')}>
                        <Text>Correct</Text>
                    </TextButton>
                    <TextButton
                        style={styles.primaryButton}
                        onPress={() => this.handleAnswer('incorrect')}>
                        <Text>Incorrect</Text>
                    </TextButton>
                </View>
            </View>
        ) : (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.bigText}>
                            🌈 You have {this.calcPercentage()} % correct Answers 🌈
                </Text>
                        <TextButton
                            style={styles.primaryButton}
                            onPress={() => this.replay()}>Play this again</TextButton>
                        <TextButton
                            style={styles.secondaryButton}
                            onPress={() => navigate('Main')}>to all decks</TextButton>
                    </View>
                </View>
            )
    }
}


const mapStateToProps = (state, props) => {
    return {
        deckId: props.navigation.state.params.deckId,
        deck: state[props.navigation.state.params.deckId],
        questions: state[props.navigation.state.params.deckId].questions
    }
}


export default connect(mapStateToProps)(QuizScreen)