import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/helper';
import { receiveAllDecks } from '../store/actions/index';
import TextButton from '../components/TextButton';
import DeckListItem from '../components/DeckListItem';
import {styles} from '../constants/Style';


class DeckListScreen extends React.Component {
    static navigationOptions = {
        title: 'All Decks',
    };

    componentWillMount() {
        const { dispatch } = this.props;
        getDecks().then((decks) => dispatch(receiveAllDecks(decks)))
    }

    render() {
        const navigate = this.props.navigation.navigate
        const decks = this.props.decks

        return (
            <View style={styles.container}>
                <TextButton
                    onPress={() => navigate('NewDeck')}
                    style={styles.primaryButton}
                >
                Create New Deck
                </TextButton>
                {decks && Object.keys(decks).length ? (
                    <ScrollView>
                        {Object.keys(decks).map((key) => {
                            return (
                                <DeckListItem
                                    key={key}
                                    deck={decks[key]}
                                    navigation={this.props.navigation}
                                    id={key}
                                />
                            )
                        })}
                    </ScrollView>
                ) : (
                        <View>
                            <Text style={styles.bigText}>There are no decks yet</Text>
                        </View>
                    )}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { decks: state }
}

export default connect(mapStateToProps)(DeckListScreen)
