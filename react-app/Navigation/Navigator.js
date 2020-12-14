import React, { useEffect, useState } from 'react';
import {  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../Screens/SingUp';
import LoginScreen from '../Screens/LoginScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage'
import { LoadingScreen } from '../styles/LoadingScreen';
import { screenOptionStyle } from '../styles/globalStyles';

const Stack = createStackNavigator();

const StackNav = () => {
    const [isLoggedIn, setisLoggedIn] = useState(null)
    const detectLogin = async () => {                
        const token = await AsyncStorage.getItem('token')
        if(token){ setisLoggedIn(true)}
        else{ setisLoggedIn(false)}           
    }
    useEffect(() => {
        detectLogin()     
    }, [])
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
           <Stack.Screen name='Loading' component={LoadingScreen} />                             
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Sign Up' component={SignUp} />
            <Stack.Screen name='Home' component={HomeScreen}/>                         
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return(
        <NavigationContainer>
            <StackNav/>
        </NavigationContainer>
    )
}

export {Navigator}
