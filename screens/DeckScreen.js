import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';
import {styles} from '../constants/Style';

class DeckScreen extends React.Component {
    
    static navigationOptions = ({ navigation } ) => {
      return {
          headerTitle: navigation.state.params.deck.title,
        }
    }

        
  render() {
    const {id, deck} = this.props
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.content}>
           {deck ? (
            <Text style={styles.bigText}>Number of Questions: {deck.questions.length} </Text>
           ) :(
            <Text style={styles.smallText}>There are no questions for {deck.title} </Text>
           )}
          <TextButton 
          style={styles.primaryButton}
          onPress={()=> navigate('Quiz', {deckId: id, title: deck.title})}>Start Quiz</TextButton>
          <TextButton 
          style={styles.secondaryButton}
          onPress={() => navigate('NewQuestion', {deckId: id})}>Add new Question</TextButton>
      </View>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    id: props.navigation.state.params.id,
    deck: state[props.navigation.state.params.id]  
  }
}

export default connect(mapStateToProps)(DeckScreen)


