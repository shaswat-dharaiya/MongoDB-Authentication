import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import {Button, TextInput} from 'react-native-paper'
import LoginScreen from './Screens/LoginScreen';
import SignUp from './Screens/SingUp';
import { LoadingScreen } from './styles/LoadingScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { Navigator } from './Navigation/Navigator';

export default function App() {  
  return (          
      <Navigator/>
  );
}