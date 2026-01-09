import React,{useState} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionCard from '../components/QuestionCard';
import { server } from '@env';
import Navbar from '../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '../theme/colors';

function QuestionsScreen({ route, navigation }) {
  const colors = useAppColors();
  const [loading, setLoading] = useState(false);

  const { interviewId, questions } = route.params;

  const giveFeedback = async () => {
    try {
      setLoading(true); 
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

      console.log("Response for feedback : ",response.data)
      navigation.navigate('result-screen', {
        feedback: response.data,
        interviewId: interviewId
      });

    } catch (err) {

      console.error('Error sending feedback:', err);
      Alert.alert('Feedback Error', 'Could not get feedback.');
    }finally{
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navbar title="Interview Questions" />

      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      > */}
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
          // ListHeaderComponent={<Text style={styles.title}>Interview Questions</Text>}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={
            <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={giveFeedback}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit & Get Feedback</Text>
            )}
          </TouchableOpacity>
          }
        />
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    paddingTop: 10,
    color: '#111827',
    textAlign: 'center',
  },
  flatListContent: {
    paddingTop: 10,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  button: {
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
