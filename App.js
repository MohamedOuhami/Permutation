import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Statistics from './components/statistics';
import Recherche from './components/Recherche';
import Combinaison from './components/Combinaison';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Statistics') {
                iconName = 'pie-chart';
              } else if (route.name === 'Recherche') {
                iconName = 'search';
              } else if (route.name === 'Combinaison') {
                iconName = 'layers';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Statistics" component={Statistics} />
          <Tab.Screen name="Recherche" component={Recherche} />
          <Tab.Screen name="Combinaison" component={Combinaison} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
