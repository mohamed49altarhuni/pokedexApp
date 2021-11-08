import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import store from './src/store';

import PokeList from './screens/PokeList';
import PokePage from './screens/PokePage';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
                                        headerShown: false
                                      }}>
        <Stack.Screen name="PokeList" component={PokeList} />
        <Stack.Screen name="PokePage" component={PokePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
