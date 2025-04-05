import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionCard from '../components/QuestionCard';

const JobQuestionForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [interviewId, setInterviewId] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setQuestions([]);
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        return;
      }

      const response = await axios.post(
        'http://192.168.196.148:3000/api/v1/interview/start-interview',
        {
          position: jobTitle,
          jobDescription,
          level: experienceLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setInterviewId(response.data.interviewId);
      console.log(`the interview id : ${response.data.interviewId}`);
      setQuestions(response.data.questions);
      console.log("Response:", response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert("Error", "Failed to generate questions.");
    }
    setLoading(false);
  };

  const giveFeedback =async()=>{
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        'http://192.168.196.148:3000/api/v1/interview/get-feedback',
        {
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
    } catch (err) {
      console.error('Error sending feedback:', err);
      Alert.alert("Feedback Error", "Could not get feedback.");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Interview Questions</Text>

      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Description"
        value={jobDescription}
        onChangeText={setJobDescription}
        multiline
      />

      <Picker
        selectedValue={experienceLevel}
        style={styles.picker}
        onValueChange={(itemValue) => setExperienceLevel(itemValue)}
      >
        <Picker.Item label="Beginner" value="beginner" />
        <Picker.Item label="Intermediate" value="intermediate" />
        <Picker.Item label="Advanced" value="advanced" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generate Questions</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007BFF" />}

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
        
      />
      <TouchableOpacity style={styles.button} onPress={giveFeedback}>
        <Text style={styles.buttonText}>Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobQuestionForm;
