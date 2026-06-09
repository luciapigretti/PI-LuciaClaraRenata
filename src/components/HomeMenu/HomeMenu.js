import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import Home from "../../screens/Home/Home";
import NuevoPost from "../../screens/PostNuevo/PostNuevo";
import Profile from "../../screens/Profile/Profile";
import Comments from '../../screens/Comments/Comments';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: () => (
                    <FontAwesome name="home" size={24} color="black" />
                )
            }} />

            <Tab.Screen name="Nuevo Posteo" component={NuevoPost} options={{
                headerShown: false,
                tabBarIcon: () => (
                    <FontAwesome name="plus-circle" size={24} color="black" />
                )
            }} />

            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon: () => (
                    <FontAwesome name="user" size={24} color="black" />
                )
            }} />
             <Tab.Screen 
                name="Comments" 
                component={Comments} 
                options={{
                    headerShown: false,
                    tabBarButton: () => null
                }} 
            />
        </Tab.Navigator>
    );
};

export default HomeMenu;