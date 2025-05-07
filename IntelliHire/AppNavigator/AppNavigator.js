import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../screens/SignupScreen.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import LoginScreen from "../screens/LoginScreen.jsx"
import InterviewScreen from "../screens/InterviewScreen.jsx"
import SplashScreen from '../screens/SplashScreen.jsx';
import QuestionsScreen from '../screens/QuestionsScreen.jsx';
import ResultScreen from '../screens/ResultScreen.jsx';
import HistoryScreen from "../screens/HistoryScreen.jsx"
import ProfileScreen from '../screens/ProfileScreen.jsx';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="q-form" component={InterviewScreen} />
        <Stack.Screen name="question-screen" component={QuestionsScreen} />
        <Stack.Screen name="result-screen" component={ResultScreen} />
        <Stack.Screen name="history" component={HistoryScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
