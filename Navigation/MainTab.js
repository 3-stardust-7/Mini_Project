import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from '@react-navigation/native';

import Home from "../src/pages/MainTabs/Home";
import Settings from "../src/pages/MainTabs/Settings";


const Tab = createBottomTabNavigator();
const MainTab = () => {
     const { colors } = useTheme();

    return(
        <>
        <Tab.Navigator
            screenOptions = {({route}) => {
                let iconName;
                if (route.name === "Home") iconName = "home-outline";
                else if (route.name === "Settings") iconName = "cog-outline";

                return {
                    tabBarIcon: ({ color, size }) => (
                    <Icon name={iconName} size={size} color={color} />
                    ),
                   headerShown: false,
                    tabBarStyle: {
                        height: "6%",              
                        backgroundColor: colors.background,
                        position: 'absolute',      
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 10,             
                        shadowColor: colors.background,      
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        zIndex: 10,          
                    },
                        tabBarSafeAreaInsets: { bottom: 8 },
                        };
                    }}
                    initialRouteName = "Home"
                >
            <Tab.Screen name = "Home" component={Home} />
            <Tab.Screen name = "Settings" component ={Settings} />
        </Tab.Navigator>
        </>
    );
};
export default MainTab;