import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JobsProvider } from './src/context/JobsContext';
import HomePage from './src/screens/HomePage';
import JobsList from './src/screens/JobsList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <JobsProvider>
          <Stack.Navigator>
            <Stack.Screen name='homePage' component={HomePage} />
            <Stack.Screen name='jobsList' component={JobsList} />
          </Stack.Navigator>
        </JobsProvider>
    </NavigationContainer>
  );
}

