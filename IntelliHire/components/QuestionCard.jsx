import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '@env';
import { useAppColors } from '../theme/colors';


const QuestionCard = ({ question, difficulty, category, questionId, interviewId }) => {
  const colors = useAppColors();
  const [answer, setAnswer] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleSubmit = async () => {
    if (!answer.trim()) return Alert.alert('Error', 'Answer cannot be empty.');

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `${server}/interview/save-answer`,
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

      Alert.alert('Answer Submitted', 'Your answer has been recorded.');
      setAnswer('');
      setInputHeight(40);
    } catch (err) {
            console.log('Error submitting answer:', err);

      Alert.alert('Submission Error', 'Could not submit your answer.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.detail}>
        Category: <Text style={styles.detailValue}>{category}</Text>
      </Text>
      <Text style={styles.detail}>
        Difficulty: <Text style={styles.detailValue}>{difficulty}</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: Math.max(40, inputHeight) }]}
          placeholder="Write your answer..."
          placeholderTextColor={colors.placeholder}
          value={answer}
          onChangeText={setAnswer}
          onContentSizeChange={(e) =>
            setInputHeight(e.nativeEvent.contentSize.height)
          }
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    marginVertical: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4, // Android shadow
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    color: '#222',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    marginTop: 16,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingRight: 10,
    maxHeight: 150,
  },
  sendButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuestionCard;
