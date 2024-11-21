import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Poppins_600SemiBold', fontSize: 20 },
        }}
      >
        <Stack.Screen 
          name="What should I ดู" 
          component={HomeScreen} 
          options={{ title: 'What Should I ดู' }} // ตั้งชื่อ Header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
