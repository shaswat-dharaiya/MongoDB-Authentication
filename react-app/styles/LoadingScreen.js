import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native'
import {  } from 'react-native-paper'
import { globalStyles } from './globalStyles'
import AsyncStorage from '@react-native-community/async-storage'

const LoadingScreen = ({navigation}) => {
    const loginDetected = async (navigation) => {
        const token = await AsyncStorage.getItem('token')
        if(token){navigation.replace('Home')}
        else{navigation.replace('Sign Up')}
    }
    
    useEffect( () => {
        loginDetected(navigation)
        // return () => {            
        // }
    }, [])
    return(
        <View style={globalStyles.loadingScreen}>
            <ActivityIndicator size='large' color='#909'/>
        </View>
    )
}

export {LoadingScreen}