import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Routes} from './Routes';

import Home from '../views/screens/home/Home';
import Puzzle from '../views/screens/puzzle/Puzzle';
import LeaderBoard from '../views/screens/leaderBoard/LeaderBoard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name={Routes.Puzzle} component={Puzzle} />
        <Stack.Screen name={Routes.LeaderBoard} component={LeaderBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Home} component={Home} />
    </Stack.Navigator>
  );
};
