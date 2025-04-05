import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuestionCard = ({ question, difficulty, category, questionId, interviewId }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    console.log("Answer of Q_id: ",questionId);
    console.log("Answer fro interview : ",interviewId);
    console.log("Answer : ",answer);
    if (!answer.trim()) return;
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        'http://192.168.196.148:3000/api/v1/interview/save-answer',
        {
          answerText: answer,
          questionId,
          interviewId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Answer submitted:', response.data);
      Alert.alert("Answer Submitted", "Your answer has been recorded.");
      setAnswer('');
    } catch (err) {
      console.error('Error submitting answer:', err);
      Alert.alert("Submission Error", "Could not submit your answer.");
    }
  };

  const handleFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        'http://192.168.196.148:3000/api/v1/interview/feedback',
        {
          feedback,
          questionId,
          interviewId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Feedback sent:', response.data);
      Alert.alert("Feedback Sent", "Thank you for your feedback.");
      setFeedback('');
    } catch (err) {
      console.error('Error sending feedback:', err);
      Alert.alert("Feedback Error", "Could not send feedback.");
    }
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
    textAlign: 'center',
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
  feedbackInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  feedbackButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  feedbackText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuestionCard;
