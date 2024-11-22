import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './utils/route';
import { ROUTES } from './utils/constants';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.HOME}>
        {routes.map(({ name, component, options }) => (
          <Stack.Screen key={name} name={name} component={component} options={options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
