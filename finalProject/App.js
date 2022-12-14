import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import MainRoot from './src/pages/MainRoot';
import MovieDetails from './src/pages/MovieDetails';
import ViewAll from './src/pages/ViewAll';
import ThemeContextProvider from './src/contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false,
        }}>
          <Stack.Screen
            name="MainRoot"
            component={MainRoot}
            options={{ title: 'MainRoot' }}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{ title: 'MovieDetails' }}
          />
          <Stack.Screen
            name="ViewAll"
            component={ViewAll}
            options={{ title: "ViewAll"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}