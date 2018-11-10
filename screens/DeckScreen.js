import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';

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
      <View>
          

           {deck ? (
            <Text>Number of Questions: {deck.questions.length} </Text>
           ) :(
            <Text>There are no questions for {deck.title} </Text>
           )}
          <TextButton onPress={() => navigate('NewQuestion', {deckId: id})}>Add new Question</TextButton>
          <TextButton onPress={()=> navigate('Quiz', {deckId: id, title: deck.title})}>Start Quiz</TextButton>
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


