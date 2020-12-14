import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import {Button, TextInput} from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

export default function SignUp({navigation}) {
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const uri = 'http://192.168.0.129:3000/signUp'
    sendCredentials = async (navigation) => {
        fetch(uri,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'email':email,
                'password':password
            })
        })
        .then(res=>res.json())
        .then(async data=> {
            console.log(data)
            try{
                await AsyncStorage.setItem('token', data.token)
                navigation.replace('Home')
            }catch(err){
                console.log(`React Error ${err}`)
            }
        })
    }
    
    
    return (    
      <KeyboardAvoidingView behavior='position'>
        <StatusBar backgroundColor='#999' barStyle='light-content' style="auto" />
        <Text style={globalStyles.headerText}>DB Auth App</Text>
        <Text style={globalStyles.text}>Mongo DB</Text>
        <View style={globalStyles.header}></View>
        <Text style={globalStyles.inputTextlabel}>create new Account</Text>
        {/* <TextInput placeholder ='Email' 
        style={globalStyles.inputText}
         />
         <TextInput placeholder ='Password' 
        style={globalStyles.inputText}
         /> */}
         <TextInput label='Email'          
          value={email}
          onChangeText={(text)=>setemail(text)}
          mode='outlined'
          style={globalStyles.inputText}
          theme={{colors:{primary:"#909"}}}
         />
         <TextInput label='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>setpassword(text)}
          mode='outlined'
          style={globalStyles.inputText}
          theme={{colors:{primary:"#909"}}}
         />
         <Button 
         mode='contained'
         style={globalStyles.button}
         onPress={() => sendCredentials(navigation)}>
           Sign Up
         </Button>         
         <TouchableOpacity style={globalStyles.touchableOpacity}
            onPress={() => {navigation.replace('Login')}}>
           <Text>
             Already have an account?
           </Text>
         </TouchableOpacity>

      </KeyboardAvoidingView>    
  );
}