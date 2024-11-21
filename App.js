import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; 
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="What should I ดู"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF' },
          headerTintColor: '#000',
          headerTitleStyle: { fontFamily: 'Poppins-Medium', fontSize: 20 },
        }}
      >
        <Stack.Screen
          name="What should I ดู"
          component={HomeScreen}
          options={{ title: 'What Should I ดู' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
