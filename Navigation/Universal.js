import {React, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigator from "./RootNavigator.js";
import AuthStack from "./AuthStack.js";


const Stack = createStackNavigator();

const Universal = () => {
  return (
    <Stack.Navigator>
        {false ?(
          <Stack.Screen name="RootNavigator" component={RootNavigator} options={{ headerShown: false }}/>
        ):(
          <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }}
          />
        )}
    </Stack.Navigator>
  );
};

export default Universal;
