/**
 * The function creates a navigation stack for a React Native app using the createStackNavigator and
 * NavigationContainer components from the @react-navigation library.
 * @returns The `App` function is being returned, which creates a stack of screens using the
 * `NavigationContainer` and `createStackNavigator` components from the `@react-navigation/native`
 * library. The stack navigator object is used to define the navigation stack for the app, including
 * the screens that will be displayed and the order in which they will be displayed. The
 * `NavigationContainer` component is the root component that
*/

/* These lines of code are importing necessary libraries and components for the app to function
properly. */
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AsteroidScreen from "./screens/AsteroidScreen";
import ISSLocationScreen from "./screens/ISSLocationScreen";

/* `const Stack = createStackNavigator();` is creating a new stack navigator object using the
`createStackNavigator` function from the `@react-navigation/stack` library. This object is then used
to define the navigation stack for the app, which includes the screens that will be displayed and
the order in which they will be displayed. */
const Stack = createStackNavigator();

function App() {
  return (
    /* This code is creating a stack of screens using the `NavigationContainer` and
    `createStackNavigator` components from the `@react-navigation/native` library. The
    `NavigationContainer` component is the root component that wraps the entire navigation stack.
    The `createStackNavigator` function is used to create a stack navigator object, which is then
    used to define the navigation stack for the app. The `initialRouteName` prop is used to set the
    initial screen to be displayed when the app is launched. The `screenOptions` prop is used to set
    options for all screens in the stack, such as hiding the header bar. The `Stack.Screen`
    components define the individual screens in the stack, including their names and the components
    that will be rendered when they are navigated to. */
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IssLocation" component={ISSLocationScreen} />
        <Stack.Screen name="Asteroids" component={AsteroidScreen} />
        <Stack.Screen name="Updates" component={UpdateScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* `export default App;` is exporting the `App` function as the default export of the module. This
allows other modules to import and use the `App` function as needed. */
export default App;