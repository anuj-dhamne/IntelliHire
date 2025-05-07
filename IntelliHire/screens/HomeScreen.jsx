import React from 'react';
import { View, Text,StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Navbar from '../components/Navbar'; // Adjust path as needed

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navbar title="Home" />
      
      <View style={styles.content}>
        <Image
          source={require('../assets/Logo.png')} // Replace with actual image path
          style={styles.image}
          resizeMode="contain"
        />

        {/* <Text style={styles.title}>Welcome to IntelliHire!</Text> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("q-form")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#333', // Black button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text on button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
