import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import {styles} from '../constants/Style';

class DeckListItem extends Component {

    render() {
        const { id, deck, navigation } = this.props

        return (
                <TouchableHighlight 
                onPress={() => navigation.navigate('Deck', { deck: deck, id: id })}>  
                    <View style={styles.card}>
                        <Text style={styles.bigText}>{deck.title}</Text>
                        <Text style={styles.bigText}>{deck.questions.length} cards</Text>
                    </View>      
                </TouchableHighlight>
        )
    }
}

export default DeckListItem
