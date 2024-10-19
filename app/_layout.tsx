// app/_layout.tsx
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './AuthScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
