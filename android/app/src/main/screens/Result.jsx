 import { StyleSheet, Text, View,KeyboardAvoidingView,TextInput,ScrollView,Image, Pressable} from 'react-native'
 import React from 'react'
 import {useState,useEffect,useRef} from 'react';
 import Markdown from 'react-native-markdown-display';
 import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
 
 const Result = ({route}) => {
  const{imageUri,disease,advice}=route.params;
  const [errorMessage,setErrorMessage]=useState('');
  const[loading,setLoading]=useState(false);
  const[question,setQuestion]=useState('');
  const[answer,setAnswer]=useState('');
  const scrollRef=useRef(null);
  const [qaList,setQaList]=useState([]);//list of question and answers
  


  useEffect(() => {
    if (disease.toLowerCase().includes("model path")) {
      setErrorMessage("Model prediction failed. Please try again.");
      setTimeout(() => setErrorMessage(''), 2000); 
    }
  }, [disease]);

  const handleask =async()=>{
    if (!question.trim())return;
    setLoading(true);
    setAnswer('');

    const currentQ=question;
    setQuestion('');

try{
  const fullquestion=`Regarding ${disease},${question}`;
  const res=await fetch('http://10.0.2.2:5000/ask',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({question:fullquestion})

  });
  let reply='';

  if (res.ok){
    const data=await res.json();
    reply=data.reply;

  }else{
    const errText=await res.text();
    setAnswer("server error:"+errText);
  }
  setQaList(prev=>[...prev,{question:currentQ,answer:reply}])
  setTimeout(()=>{
    scrollRef.current?.scrollToEnd({animated:true});
  },100);
  }catch(err){
   setQaList(prev=>[...prev,{question:currentQ,answer:'failed to connect:'+err.message}]);
  }finally{
    setLoading(false);
  }
  };

   return (
  <SafeAreaProvider>
  <SafeAreaView style={styles.container}>
  <KeyboardAvoidingView style={styles.keyb}
    behavior={Platform.OS=='ios'?'padding':'height'}>
    <ScrollView ref={scrollRef} contentContainerStyle={{flexGrow:1}}
    keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      
      
       {imageUri &&(
              <Image source={{uri:imageUri}}style={styles.image}/>
            )}
            <Markdown style={{body:{fontSize:17,marginLeft:5,marginRight:10}}}>
             {`**Disease:** ${disease}\n\n ${advice}`}
            </Markdown>
            {errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            {qaList.map((item, index) => (
            <View key={index} style={{ marginTop: 15, marginHorizontal: 10 }}>
            <View style={styles.questionBox2}>
            <Text style={styles.questionText}>
              Q: {item.question}
            </Text>
            </View>
           <Markdown style={{ body: { marginTop: 10, fontSize: 18, padding: 12 } }}>
            {item.answer}
            </Markdown>
            </View>
            ))}
             </View>
                </ScrollView>
   <View style={styles.questionContainer}>
   <TextInput
    style={styles.questionbox}
    placeholder='Ask question about disease'
    value={question}
    onChangeText={setQuestion}
    />
  <Pressable
  onPress={handleask}
  disabled={loading}
  style={({ pressed }) => [
    styles.askButton,
    loading && styles.disabledButton,
    pressed && styles.pressedButton
  ]}>

  <Text style={styles.askButtonText}>
    {loading ? "...." : "Ask"}
  </Text>
</Pressable>

   </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
   );
};
export default Result;
 
 
const styles = StyleSheet.create({
    container:{
  paddingTop: Platform.OS === 'android' ? 25 : 0,
  backgroundColor: '#fff',
  flex:1
        
    },
keyb:{
  flex:1
},
    
  image:{
    marginTop:10,
    height:150,
    width:150,
    alignSelf:"center",
    borderRadius:10
  },
  disease: {
   
    fontWeight: 'bold',
    marginBottom: 10,
  },
  advice: {
    marginBottom: 20,
  },
   error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  },
  questionText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},
questionBox2: {
  backgroundColor: 'white', // light orange shade
  padding: 12,
  borderRadius: 10,
  borderColor:"black",
  borderWidth: 1,
  borderColor: '#FE7743',
  marginBottom: 15,
  width:"100%",

},

   
  questionContainer: {
   padding: 12,
    borderTopWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    position:"absolute",
    bottom:0,
    paddingHorizontal:20,
    width:'100%',
    zIndex: 1,
    
  },
  questionbox:{
    width:'100%',
    borderColor:'#FE7743',
    paddingVertical:20,
    paddingHorizontal:50,
    borderRadius:20,
    backgroundColor:'#f0f0f0',
    borderWidth:2,

  },
  askButton: {
    backgroundColor: '#FE7743',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  askButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  pressedButton: {
    opacity: 0.7,
  },
  

  input:{
    fontWeight:'bold',
    fontSize:16
  }

});