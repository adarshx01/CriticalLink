import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import AlertsScreen from './screens/AlertsScreen';
// import PatientsScreen from './screens/PatientsScreen';
// import NurseScreen from './screens/NurseScreen';
// import MedicineScreen from './screens/MedicineScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Alerts') {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';
            } else if (route.name === 'Patients') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Nurse') {
              iconName = focused ? 'medical' : 'medical-outline';
            } else if (route.name === 'Medicine') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="Patients" component={PatientsScreen} />
        <Tab.Screen name="Nurse" component={NurseScreen} />
        <Tab.Screen name="Medicine" component={MedicineScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}