
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './android/app/src/main/screens/Home';
import Result from './android/app/src/main/screens/Result';

const Stack=createNativeStackNavigator();

export default function APP(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Result" component={Result}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

