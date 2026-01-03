import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux'; // <--- Import

// Import Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import AgentLoginScreen from '../screens/Auth/AgentLoginScreen';
import OTPScreen from '../screens/Auth/OTPScreen';
import PudoSelectionScreen from '../screens/Auth/PudoSelectionScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/Dashboard/ProfileScreen';
import AgentDashboardScreen from '../screens/Dashboard/AgentDashboardScreen';
import AgentScanScreen from '../screens/Dashboard/AgentScanScreen';
import ScannerScreen from '../screens/Dashboard/ScannerScreen';
import ParcelDetailsScreen from '../screens/Dashboard/ParcelDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // Check Memory
  const { isAuthenticated, pudoId, isAgent } = useSelector(state => state.auth);

  // Determine where to start
  // If logged in AND has PUDO -> Dashboard
  // If logged in BUT no PUDO -> PudoSelection
  // Else -> Login
  let initialRoute = "Login";

  if (isAuthenticated) {
    if (isAgent) {
      initialRoute = "AgentDashboard";
    } else {
      initialRoute = pudoId ? "Dashboard" : "PudoSelection";
    }
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={initialRoute} // <--- Dynamic Start
          screenOptions={{
            headerShown: false, // We will build custom headers
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AgentLogin" component={AgentLoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="PudoSelection" component={PudoSelectionScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="AgentDashboard" component={AgentDashboardScreen} />
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="AgentScan" component={AgentScanScreen} />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ headerShown: true, title: '', headerBackTitle: 'Back' }}
          />
          <Stack.Screen 
            name="ParcelDetails" 
            component={ParcelDetailsScreen} 
            options={{ headerShown: true, title: 'Details', headerBackTitle: 'Back' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
