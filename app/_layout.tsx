// app/_layout.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { UserProvider } from '../userContext';
import HomeScreen from './home';
import LoginScreen from './login';
import ProfileScreen from './profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ----- Stack inside Home Tab -----
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// ----- Tabs -----
export default function RootLayout() {
  return (
    <UserProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') iconName = 'home-outline';
            else if (route.name === 'ProfileTab') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{ title: 'Profile', headerShown: true }}
        />
      </Tab.Navigator>
    </UserProvider>
  );
}
