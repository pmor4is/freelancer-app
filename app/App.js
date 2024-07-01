import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsProvider from './src/context/JobsContext';
import HomePage from './src/screens/HomePage';
import JobsList2 from './src/screens/JobsList2';

import JobsList from './src/screens/JobsList';
import JobsCreate from './src/screens/JobsCreate';
import JobDetail from './src/screens/JobDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <JobsProvider>
          <Stack.Navigator>
            <Stack.Screen name='homePage' component={HomePage} />
            <Stack.Screen name='jobsList2' component={JobsList2} />
            <Stack.Screen name='jobsList' component={JobsList} />
            <Stack.Screen name='jobsCreate' component={JobsCreate} />
            <Stack.Screen name='jobDetail' component={JobDetail} />
          </Stack.Navigator>
        </JobsProvider>
    </NavigationContainer>
  );
}

