import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Navbar from '../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';


const ResultScreen = ({ route }) => {
  const { feedback, interviewId } = route.params;
  const res = feedback.feedbackData;


  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Don't know how to open this URL: " + url);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navbar title={'Result'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Interview ID</Text>
            <Text style={styles.value}>{interviewId}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Score</Text>
            <Text style={styles.score}>{res.averageMarks} / 10</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Summary</Text>
            <Text style={styles.value}>
              {res.overallFeedback || 'No summary provided.'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Recommended Resources</Text>
            <View style={styles.linksContainer}>
              {res.resources?.websites?.map((link, index) => (
                <TouchableOpacity key={index} onPress={() => openURL(link)}>
                  <Text style={styles.linkText}>🔗 Website {index + 1}</Text>
                </TouchableOpacity>
              ))}
              {res.resources?.youtube && (
                <TouchableOpacity onPress={() => openURL(res.resources.youtube)}>
                  <Text style={styles.linkText}>▶️ YouTube Video</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  linksContainer: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 15,
    color: '#3B82F6',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
});

export default ResultScreen;
