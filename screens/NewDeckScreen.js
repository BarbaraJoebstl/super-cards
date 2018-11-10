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
        const key = uuidv1()
        const newDeck = {
            title: this.state.title,
            questions: []
        }

        this.props.addNewDeck(key, newDeck)
        saveNewDeck(key, newDeck)
        this.setState({title:''})
        this.props.navigation.navigate('Deck', {deck: newDeck})
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
      addNewDeck: (key, entry) => dispatch(addNewDeck({key: entry})),
    }
  }
 

export default connect(null, mapDispatchToProps)(NewDeckScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
