import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainTab from "./MainTab.js";

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name = "MainTabs" component = {MainTab}/>
        </Stack.Navigator>
    )
}
export default RootNavigator;