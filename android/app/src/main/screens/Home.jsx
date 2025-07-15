import { StyleSheet, Text, Pressable,View,Image,ScrollView,PermissionsAndroid,Platform} from 'react-native'
import React from 'react'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { handlepredictionandnavigation } from './Api';
import  { useState } from 'react';
import {SafeAreaView,SafeAreaProvider}from 'react-native-safe-area-context';


export default function Home({navigation}){

  const[cameraLoading,setCameraLoading]=useState(false);
  const[galleryLoading,setGalleryLoading]=useState(false)

  const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const openCamera =async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) return;

launchCamera({mediaType:'photo'},async (response)=>{
    if(response.didCancel||response.errorCode) return;
    if(response.assets && response.assets.length>0){

      const imageUri=response.assets[0].uri;
      setCameraLoading(true);
    await handlepredictionandnavigation(imageUri,navigation,setCameraLoading);
    setCameraLoading(false);
    
}
});  
};

   const openGallery=()=>{
    launchImageLibrary({mediaType:'photo'},async(response)=>{
    if(response.didCancel||response.errorCode)return;
    if(response.assets&&response.assets.length>0){
      const imageUri=response.assets[0].uri;
      setGalleryLoading(true);
      await handlepredictionandnavigation(imageUri,navigation,setGalleryLoading);
      setGalleryLoading(false)
    }
    });
   };

  return (
    <SafeAreaProvider>
   <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
      <Text style={styles.texthead}>
        skinsight
      </Text>
      </View>
        <View style={styles.imageContainer}>
       <Image source={require('../../assets/pic.png')} style={styles.image}
       resizeMode="contain" />
       
       </View>
      

      <View style={styles.buttonContainer}>
    <Pressable style={styles.Pressable}onPress={openCamera}>
        <Text style={styles.text2}>{cameraLoading?'Loading...':'Scan Your Skin'}
        </Text>
      </Pressable>
      <Pressable style={styles.Pressable2}onPress={openGallery}>
        <Text style={styles.text2}>{galleryLoading?'Loading...':'Select from Gallery'}
          
        </Text>
      </Pressable>
      </View>
       <View style={styles.diclContainer}>
       <Text style={styles.discl}>
        <Text style={{fontWeight:'bold'}}>⚠️ Medical Disclaimer:</Text> This app provides informational analysis only and should not replace professional medical advice. Always consult a dermatologist for proper diagnosis and treatment.
       </Text>
      </View>
      </ScrollView>
      </SafeAreaView>
      </SafeAreaProvider>

  );
}
const styles = StyleSheet.create({
  
   container:{
    flex:1,
    backgroundColor:"white",
    
    
  },
  scrollContent: {
  flexGrow: 1,
  justifyContent: 'space-between', // distribute content properly
},
    
  card:{
     backgroundColor: '#FE7743',
    borderRadius: 12,
    margin: 10,
    elevation: 4, // Android shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems:"center",
    height:50,
    
    


    
  },
  

  texthead:{
    fontSize:25,
    fontWeight:"bold",
    color:"white",
    marginTop:5
    

  },

  imageContainer: {
  backgroundColor: 'white',
  flex: 1,
  justifyContent:"center",
  alignItems: 'center',
  paddingHorizontal: 50,
  
 
  
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
     marginBottom:50,
     borderRadius:200,
     shadowOffset:{ width: 0, height: 5 },
     shadowOpacity:0.2,
    elevation:4,
  },
    


  
  
text2:{
    marginTop:7,
    fontWeight:'bold',
    marginBottom:4,
    color:'white',
    fontSize:18
    
  },
  buttonContainer: {
    padding: 10,
    // borderTopWidth: 1,
    // borderColor: 'black',
    backgroundColor: 'white',
    paddingBottom:10,
    paddingHorizontal:40,
    width:'100%',
    marginBottom:50
  },
  Pressable:{
    width:'100%',
    height:50,
    backgroundColor:"#FE7743",
    marginBottom:10,
    alignItems:"center",
    borderRadius:10,
    justifyContent:"center",
    alignSelf:"center",
    shadowOpacity:0.2,
    elevation:4,
    shadowOffset: { width: 0, height: 5 },
    
  },
 
Pressable2:{
    width:'100%',
    height:50,
    backgroundColor:"#FE7743",
    marginBottom:10,
    alignItems:"center",
    borderRadius:10,
    alignSelf:"center",
    justifyContent:"center",
    shadowOpacity:0.2,
    elevation:4,
    shadowOffset: { width: 0, height: 5 },
    
    
  },
   diclContainer: {
    padding: 10,
   marginTop:'auto',
   width:'100%',
   borderColor:'gray',
   borderTopWidth:1,
  //  justifyContent:"center"
  },

  discl:{
    fontWeight:"bold",
    fontSize:15,
    marginBottom:5,
    alignSelf:"flex-start",
    fontFamily:"sans-serif-light",
    flexDirection:"row"

  },
   
});