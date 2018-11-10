import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

class DeckListItem extends Component {

    render() {
        const { id, deck, navigation } = this.props

        return (
                <TouchableHighlight onPress={() => navigation.navigate('Deck', { deck: deck, id: id })}>  
                    <View>
                        <Text>{deck.title}</Text>
                        <Text>{deck.questions.length} cards</Text>
                    </View>      
                </TouchableHighlight>
        )
    }
}

export default DeckListItem
