// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QuestionCard from '../components/QuestionCard';
// import {server} from "@env";

// const JobQuestionForm = () => {
//   const [jobTitle, setJobTitle] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [experienceLevel, setExperienceLevel] = useState('beginner');
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [interviewId, setInterviewId] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setQuestions([]);
//     try {
//       let accessToken = await AsyncStorage.getItem('accessToken');

//       if (!accessToken) {
//         Alert.alert("Authentication Error", "Please log in again.");
//         return;
//       }

//       const response = await axios.post(
//         `${server}/interview/start-interview`,
//         {
//           position: jobTitle,
//           jobDescription,
//           level: experienceLevel,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setInterviewId(response.data.interviewId);
//       console.log(`the interview id : ${response.data.interviewId}`);
//       setQuestions(response.data.questions);
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       Alert.alert("Error", "Failed to generate questions.");
//     }
//     setLoading(false);
//   };

//   const giveFeedback =async()=>{
//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken');
//       const response = await axios.post(
//         `${server}/interview/get-feedback`,
//         {
//           interviewId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('Feedback received :', response.data);
//     } catch (err) {
//       console.error('Error sending feedback:', err);
//       Alert.alert("Feedback Error", "Could not get feedback.");
//     }
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Generate Interview Questions</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Job Title"
//         value={jobTitle}
//         onChangeText={setJobTitle}
//       />

//       <TextInput
//         style={[styles.input, styles.textArea]}
//         placeholder="Job Description"
//         value={jobDescription}
//         onChangeText={setJobDescription}
//         multiline
//       />

//       <Picker
//         selectedValue={experienceLevel}
//         style={styles.picker}
//         onValueChange={(itemValue) => setExperienceLevel(itemValue)}
//       >
//         <Picker.Item label="Beginner" value="beginner" />
//         <Picker.Item label="Intermediate" value="intermediate" />
//         <Picker.Item label="Advanced" value="advanced" />
//       </Picker>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Generate Questions</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="large" color="#007BFF" />}

//       <FlatList
//         data={questions}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <QuestionCard
//             question={item.questionText}
//             difficulty={item.difficulty}
//             category={item.category}
//             questionId={item._id}
//             interviewId={interviewId}
//           />
//         )}
        
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 100,
//   },
//   picker: {
//     width: '100%',
//     height: 50,
//     marginBottom: 15,
//   },
//   button: {
//     width: '100%',
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default JobQuestionForm;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { server } from "@env";

const JobQuestionForm = () => {
  const navigation = useNavigation();
  
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [numQuestions, setNumQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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
      console.log("Intervew id on interview screen : ",interviewId);
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
    <View style={styles.container}>
      <Text style={styles.title}>Interview Setup</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Number of Questions"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    justifyContent: 'center',
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
    backgroundColor: '#fff',
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

export default JobQuestionForm;

