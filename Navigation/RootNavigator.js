import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainTab from "./MainTab.js";
import AddDonor from "../src/pages/Forms/AddDonor.js";
import AddPatient from "../src/pages/Forms/AddPatient.js";
import DiseasePredict from "../src/pages/DiseasePredict.jsx"

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name = "MainTabs" component = {MainTab}/>
            <Stack.Screen name="AddPatient" component={AddPatient} />
            <Stack.Screen name="AddDonor" component={AddDonor} />
            <Stack.Screen name="DiseasePredict" component={DiseasePredict} />
        </Stack.Navigator>
    )
}
export default RootNavigator;