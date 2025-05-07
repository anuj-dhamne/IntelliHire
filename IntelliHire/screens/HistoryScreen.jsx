// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, StatusBar } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { server } from '@env';
// import Navbar from '../components/Navbar';

// const InterviewCardScreen = ({ route }) => {
//   // const { interviewId } = route.params;
//   const [interviewData, setInterviewData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInterviewDetails = async () => {
//       try {
//         const accessToken = await AsyncStorage.getItem('accessToken');
//         const res = await axios.get(`${server}/progress/get-detail-progress`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         console.log("response for history : ",res.data);

//         // const singleInterview = res.data.find(item => item._id === interviewId);
//         setInterviewData(res.data);
//         console.log('Single Interview:', singleInterview);
//       } catch (error) {
//         console.error('Error fetching interview data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInterviewDetails();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#10B981" />
//       </View>
//     );
//   }

//   if (!interviewData) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Unable to load interview data.</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <Navbar title="Interview Summary" />

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.label}>Position</Text>
//             <Text style={styles.value}>{interviewData.position || 'N/A'}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Level</Text>
//             <Text style={styles.value}>{interviewData.level || 'N/A'}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Score</Text>
//             <Text style={styles.score}>{interviewData.averageMarks} / 10</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Interview Date</Text>
//             <Text style={styles.value}>
//               {new Date(interviewData.createdAt).toLocaleDateString()}
//             </Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Interview ID</Text>
//             <Text style={styles.value}>{interviewData._id}</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   row: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6B7280',
//     marginBottom: 4,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   value: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   score: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#10B981',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   errorContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#FEE2E2',
//     borderRadius: 12,
//   },
//   errorText: {
//     color: '#B91C1C',
//     fontWeight: '600',
//   },
// });

// export default InterviewCardScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server } from '@env';
import Navbar from '../components/Navbar';

const InterviewCardScreen = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const res = await axios.get(`${server}/progress/get-detail-progress`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Response for interview history:", res.data);
        setInterviews(res.data.feedbacks); // Set the array of interviews
      } catch (error) {
        console.error('Error fetching interview data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, []);

  const renderInterviewCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Position</Text>
        <Text style={styles.value}>{item.interview.position || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{item.interview.level || 'N/A'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Score</Text>
        <Text style={styles.score}>{item.feedback.averageMarks} / 10</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Interview Date</Text>
        <Text style={styles.value}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Interview ID</Text>
        <Text style={styles.value}>{item._id}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!interviews || interviews.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No interview records found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navbar title="History" />
      <FlatList
        data={interviews}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.scrollContent}
        renderItem={renderInterviewCard}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  errorText: {
    color: '#B91C1C',
    fontWeight: '600',
  },
});

export default InterviewCardScreen;

