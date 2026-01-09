
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { server } from "@env";
import Navbar from '../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '../theme/colors';

const JobQuestionForm = () => {
  const colors = useAppColors();
  const navigation = useNavigation();

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [numQuestions, setNumQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    // marginTop:40
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#111827',
    textAlign: 'center',
  },
  input: {
    height: 50,
    color: colors.text,
    backgroundColor: colors.background,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    color: colors.text,
  },
  button: {
    width: '100%',
    backgroundColor: '#333', // Dark grey button color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

  const handleSubmit = async () => {
    // const colors = useAppColors();
    if (!jobTitle.trim()) {
      Alert.alert("Validation Error", "Please enter the job title.");
      return;
    }

    if (!jobDescription.trim()) {
      Alert.alert("Validation Error", "Please enter the job description.");
      return;
    }

    if (!numQuestions.trim()) {
      Alert.alert("Validation Error", "Please enter the number of questions.");
      return;
    }

    const questionCount = parseInt(numQuestions);
    if (isNaN(questionCount) || questionCount <= 0) {
      Alert.alert("Validation Error", "Number of questions must be a positive number.");
      return;
    }

    setLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        return;
      }

      const response = await axios.post(
        `${server}/interview/start-interview`,
        {
          position: jobTitle,
          jobDescription,
          level: experienceLevel,
          quantity: questionCount ? questionCount : 5
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { interviewId, questions } = response.data;
      console.log("Intervew id on interview screen : ", interviewId);
      navigation.navigate('question-screen', {
        interviewId,
        questions,
      });

    } catch (error) {

      console.error('Error generating questions:', error);
      Alert.alert("Error", "Failed to generate questions.");
    }

    setLoading(false);
  };


  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Navbar title="Interview" />

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <TextInput
            style={styles.input}
            placeholder="Job Title"
            placeholderTextColor={colors.placeholder}
            value={jobTitle}
            onChangeText={setJobTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Job Description"
            placeholderTextColor={colors.placeholder}
            value={jobDescription}
            onChangeText={setJobDescription}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Number of Questions"
           placeholderTextColor={colors.placeholder}
            value={numQuestions}
            onChangeText={setNumQuestions}
            keyboardType="numeric"
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Start Interview</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//     // marginTop:40
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 50,
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 30,
//     color: '#111827',
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     color: colors.text,
//     backgroundColor: colors.background,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   picker: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#333', // Dark grey button color
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

export default JobQuestionForm;

