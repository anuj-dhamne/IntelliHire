import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon

const QuestionCard = ({ question, difficulty, category }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    console.log(`Answer submitted: ${answer}`);
    setAnswer('');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.detail}>Category: {category}</Text>
      <Text style={styles.detail}>Difficulty: {difficulty}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your answer..."
          value={answer}
          onChangeText={setAnswer}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default QuestionCard;
