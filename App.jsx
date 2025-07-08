
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './android/app/src/main/screen/home';
import Result from './android/app/src/main/screen/Result';

const Stack=createNativeStackNavigator();

export default function APP(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen Nmae="Result" component={Result}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

