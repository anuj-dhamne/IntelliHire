import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const ResultScreen = ({ route }) => {
  const { feedback, interviewId } = route.params;
  console.log("Feedback : ",feedback.feedbackData);
    const res=feedback.feedbackData;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Interview Feedback</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Interview ID:</Text>
          <Text style={styles.value}>{interviewId}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Score:</Text>
          <Text style={styles.score}>{res.averageMarks} / 10</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Summary:</Text>
          <Text style={styles.value}>{res.overallFeedback || 'No summary provided.'}</Text>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.label}>Improvement Tips:</Text>
          <Text style={styles.value}>{feedback.tips || 'No suggestions provided.'}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
    marginTop:10
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
});

export default ResultScreen;
