import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
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

  const handleSubmit = async () => {
    setLoading(true);
    setQuestions([]);
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');

      console.log("Retrieved Access Token:", accessToken);

    if (!accessToken) {
      console.log("No access token found in AsyncStorage");
      Alert.alert("Authentication Error", "Please log in again.");
      return;
    }

    console.log("Sending Access Token:", accessToken); 

      const response = await axios.post('http://192.168.196.148:3000/api/v1/interview/start-interview', {
        position:jobTitle,
        jobDescription,
      level: experienceLevel,
      },
      { headers: { Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json" } }
    );

      setQuestions(response.data.questions);
      // console.log("Response for Qs :",questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

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
    />
  )}
/>

      
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  question: {
    fontSize: 16,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },
});

export default JobQuestionForm;
