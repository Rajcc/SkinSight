import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <Pressable style={styles.Pressable}onPress={handleSignIn}>
        <Text style={styles.text2}>
          scan
        </Text>
      </Pressable>
  )
}

export default home

const styles = StyleSheet.create({

text2:{
    marginTop:7,
    fontWeight:'bold',
    marginBottom:4,
    color:'white'
    
  },

})