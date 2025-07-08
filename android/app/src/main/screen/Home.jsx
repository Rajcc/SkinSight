import { StyleSheet, Text, View,Pressable,Image,Alert, Platform,KeyboardAvoidingView,ScrollView,TextInput} from 'react-native'
import React from 'react'
import {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';


export default function Home(){
    const[imageUri,setImageuri]=useState(null);
    const[question,setQuestion]=useState("");
    const[answer,setAnswer]=useState("");



const openCamera = () => {

launchCamera({mediaType:'photo',saveToPhotos:true},(response)=>{
    if(response.didCancel||response.errorCode) return;
    if(response.assets && response.assets.length>0){
        setImageuri(response.assets[0].uri);

    }
});


};

  return (

    <KeyboardAvoidingView
    style={styles.keyb}
    behavior={Platform.OS=='ios'?'padding':'height'}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
    <Pressable style={styles.Pressable}onPress={openCamera}>
        <Text style={styles.text2}>
          scan
        </Text>
      </Pressable>
     
      {imageUri &&(
        <Image source={{uri:imageUri}}style={styles.image}/>
      )}
       </ScrollView>
    </View>
    <View style ={styles.questionbox}>
      <TextInput
      style={styles.input}
      placeholder="Ask about this condition"
      value={question}
      onChangeText={setQuestion}
      />
      </View>
    </KeyboardAvoidingView>




  );
}



const styles = StyleSheet.create({
keyb:{
  flex:1
},

  container:{
    flex:1,
    backgroundColor:"white",
  },

text2:{
    marginTop:7,
    fontWeight:'bold',
    marginBottom:4,
    color:'white'
    
  },
  Pressable:{
    width:50,
    height:50,
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
    borderRadius:20,
    backgroundcolor:'#f0f0f0'

  },
  input:{
    fontWeight:'bold',
    fontSize:16
  }

});