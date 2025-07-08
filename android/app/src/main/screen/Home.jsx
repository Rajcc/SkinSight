import { StyleSheet, Text, Pressable,} from 'react-native'
import React from 'react'
import {launchCamera} from 'react-native-image-picker';


export default function Home({navigation}){

const openCamera = () => {

launchCamera({mediaType:'photo',saveToPhotos:true},(response)=>{
    if(response.didCancel||response.errorCode) return;
    if(response.assets && response.assets.length>0){
      const imageUri=response.assets[0].uri;
      navigation.navigate('Result',{imageUri})
       

    }
});


};

  return (

  
    <Pressable style={styles.Pressable}onPress={openCamera}>
        <Text style={styles.text2}>
          scan
        </Text>
      </Pressable>
      
     




  );
}



const styles = StyleSheet.create({

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
 
  
});