import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  //   await AsyncStorage.removeItem('token');
  //   navigation.replace('Login'); // Redirect to login
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to IntelliHire!</Text>
      {/* <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default HomeScreen;
