import React from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import uuidv1 from 'uuid/v1';
import { saveNewDeck } from '../utils/helper';
import { addNewDeck } from '../store/actions/index';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';

class NewDeckScreen extends React.Component {

    static navigationOptions = () => {
        return {
            headerTitle: "Create a new Deck"
        }
    }

    state = { title: '' }

    handleSubmit() {
        let key = uuidv1()
        let newDeck = {
            title: this.state.title,
            questions: []
        }

        let entry_for_store = {
            id: key,
            title: this.state.title,
            questions: []
        }
        
        this.props.addNewDeck(entry_for_store)
        saveNewDeck(key, newDeck)
        this.setState({ title: '' })
        this.props.navigation.navigate('Deck', { deck: newDeck, id: key })
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.text}
                        placeholder='name your new deck'
                    />
                    <TextButton
                        onPress={() => this.handleSubmit()}>Add to my decks</TextButton>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addNewDeck: (entry_for_store) => dispatch(addNewDeck(entry_for_store)),
    }
}


export default connect(null, mapDispatchToProps)(NewDeckScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
