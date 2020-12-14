import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { globalStyles } from '../styles/globalStyles'
import AsyncStorage from '@react-native-community/async-storage'

const HomeScreen = ({navigation}) => {

    const [token, settoken] = useState('')
    const [email, setemail] = useState('loading..')
    const uri = 'http://192.168.0.129:3000/'

    const fetchToken = async () => {
        const token2 = await AsyncStorage.getItem('token')
        fetch(uri,{            
            headers:new Headers({
                'Authorization':'Bearer '+token2
            })
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
            setemail(data.email)
        })
    }
    
    useEffect(() => {           
        fetchToken()             
    }, [])

    const logOut = (navigation) => {
        AsyncStorage.removeItem('token')
        .then(() => {
            navigation.replace('Login')
        })
    }
    

    return(
        <View style={globalStyles.container} > 
        <StatusBar backgroundColor='#999' barStyle='light-content' style="auto" />
            <Text style={[globalStyles.text,{textAlign: 'center'}]}>Your email id is {email}</Text>
            <Button 
                mode='contained'
                style={globalStyles.button}
                onPress={() => logOut(navigation)}>           
           Log Out
         </Button> 
        </View>
    )
}

export {HomeScreen}
