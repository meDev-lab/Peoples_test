import React, {Suspense} from 'react';
import {LogBox, Platform, StatusBar, View, Text} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import People from './screens/People';
import User from './screens/User';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  const createStack = <T extends ParamListBase>() => {
    if (Platform.OS === 'ios') {
      return createNativeStackNavigator<T>();
    }
    return createStackNavigator<T>();
  };

  const Stack = createStack();

  return (
    <>
      <Suspense
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }>
        {Platform.OS === 'ios' && (
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="People" component={People} />
            <Stack.Screen name="User" component={User} />
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </>
  );
};

export default App;
