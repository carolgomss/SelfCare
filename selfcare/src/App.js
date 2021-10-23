import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./Scenes/Login/Login";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import History from "./Scenes/History/History";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function App() {
  const Stack = createStackNavigator();

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
