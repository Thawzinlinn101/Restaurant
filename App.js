import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FoodList from './src/container/foodList';
import FoodListDetail from './src/container/foodListDetail';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FoodList" screenOptions={{ headerStyle: { backgroundColor: '#0A77BC' }, headerTintColor: '#fff', }} >
        <Stack.Screen name="FoodList" component={FoodList} options={{ headerShown: false }} />
        <Stack.Screen name="FoodListDetail" component={FoodListDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}