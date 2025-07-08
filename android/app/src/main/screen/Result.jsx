 import { StyleSheet, Text, View,KeyboardAvoidingView,TextInput,ScrollView,SafeAreaView} from 'react-native'
 import React from 'react'
 import {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
 
 const result = () => {
   return (
  <SafeAreaView style={styles.container}>
  <KeyboardAvoidingView
    style={styles.keyb}
    behavior={Platform.OS=='ios'?'padding':'height'}>
    
    
    <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.container}>
      
       {imageUri &&(
              <Image source={{uri:imageUri}}style={styles.image}/>
            )}
             </View>
                </ScrollView>

   
    </KeyboardAvoidingView>
    </SafeAreaView>
   );
}
 
 
const styles = StyleSheet.create({

    container:{
        flex:1
    },
keyb:{
  flex:1
},
    
  image:{
    height:100,
    width:100,
  },
  questionbox:{
    position:'absolute',
    width:'100%',
    bottom:0,
    borderColor:'black',
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius:50,
    backgroundcolor:'#f0f0f0',
    borderWidth:5,
    margin:10,
    marginLeft:0

  },
  input:{
    fontWeight:'bold',
    fontSize:16
  }

});