import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionCard from '../components/QuestionCard';
import { server } from '@env';

function QuestionsScreen({ route, navigation }) {
  const { interviewId, questions } = route.params;

  const giveFeedback = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `${server}/interview/get-feedback`,
        { interviewId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log('Feedback received:', response.data);
      
      // ✅ Navigate to Results screen
      navigation.navigate('result-screen', {
        feedback: response.data,
        interviewId: interviewId
      });

    } catch (err) {
      console.error('Error sending feedback:', err);
      Alert.alert('Feedback Error', 'Could not get feedback.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      >
        <Text style={styles.title}>Interview Questions</Text>

        <FlatList
          data={questions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <QuestionCard
              question={item.questionText}
              difficulty={item.difficulty}
              category={item.category}
              questionId={item._id}
              interviewId={interviewId}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListFooterComponent={
            <TouchableOpacity style={styles.button} onPress={giveFeedback}>
              <Text style={styles.buttonText}>Submit & Get Feedback</Text>
            </TouchableOpacity>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    paddingTop: 30,
    color: '#111827',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default QuestionsScreen;
