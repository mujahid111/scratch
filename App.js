/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Creators as itemsDispatcher } from './src/store/character';
import Dashboard from "./src/screens/Dashboard";
import colors from "./src/utils/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Feather';
import Button from "./src/components/Button";
import Search from "./src/screens/Search";
import Favourites from "./src/screens/Favourites";
import Detail from "./src/screens/Detail";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={Dashboard} options={{
              title: "The Breaking Bad",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTitleStyle: {
                color: colors.textPrimary,
                fontFamily: "Roboto-Bold",
              },
              headerRight: (p) => {
                const navigation = useNavigation();
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Button style={{ marginRight: 26 }} onPress={() => navigation.navigate("Search")}>
                      <Icon name="search" size={20} color={colors.textPrimary} />
                    </Button>
                    <Button>
                      <Icon name="heart" size={20} color={colors.secondary} onPress={() => navigation.navigate("Favourites")} />
                    </Button>
                  </View>
                )
              }
            }} />
            <Stack.Screen name="Detail" component={Detail} options={{
              headerTransparent: true,
              title: "",
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Button>
                      <IconF name="arrow-left" size={20} color={colors.textPrimary} onPress={() => navigation.goBack()} />
                    </Button>
                  </View>
                )
              },
              headerRight: (p) => {
                const navigation = useNavigation();
                const dispatch = useDispatch();
                const { favourites } = useSelector(state => state.characters);
                const item=navigation.getState?.()?.routes[navigation?.getState?.()?.index]?.params?.item;
                const toggleHandler = () => {
                  if (!favourites.find(a => a.char_id === item?.char_id)) {
                    dispatch(itemsDispatcher.addFavourite(item))
                  } else {
                    dispatch(itemsDispatcher.removeFavourite(item))
                  }
                };

                return (
                  <View style={{ flexDirection: "row" }}>
                    <Button onPress={toggleHandler}>
                      {!favourites.find(a => a.char_id === item?.char_id) ? <IconF
                        name="heart"
                        size={20} color={colors.secondary} />
                        : <Icon
                          name="heart"
                          size={20} color={colors.secondary} />}
                    </Button>
                  </View>
                )
              }
            }} />
            <Stack.Screen name="Search" component={Search} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Favourites" component={Favourites} options={{
              title: "Favourites",
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerBackVisible: false,
              headerTitleStyle: {
                color: colors.secondary,
                fontFamily: "Roboto-Bold",
              },
              headerRight: (p) => {
                const navigation = useNavigation();
                return (
                  <View style={{ flexDirection: "row" }}>
                    <Button onPress={() => navigation.goBack()}>
                      <IconF name="x" size={20} color={colors.textPrimary} />
                    </Button>
                  </View>
                )
              }
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    fontFamily: "Roboto-Light"
  }
});

export default App;