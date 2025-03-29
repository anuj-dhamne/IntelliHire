import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

  //   await AsyncStorage.removeItem('token');
  //   navigation.replace('Login'); // Redirect to login
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to IntelliHire!</Text>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText} onPress={navigation.navigate("q-form")}>Get Started</Text>
      </TouchableOpacity>
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
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
export default HomeScreen;
