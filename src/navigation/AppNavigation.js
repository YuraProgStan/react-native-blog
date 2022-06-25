import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from "react-native";
import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";
import {THEME} from "../theme";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BookedScreen from "../screens/BookedScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AboutScreen from "../screens/AboutScreen";
import CreateScreen from "../screens/CreateScreen";


const AppStack = createNativeStackNavigator();

const navigatorOptions = {
    headerMode: 'screen',
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
    headerStyle: {backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'},
}

const AppStackNavigation = () => {
    return (
        <AppStack.Navigator
            initialRouteName="Main"
            screenOptions={navigatorOptions}
        >
            <AppStack.Screen name="Main" options={{
                title: 'Awesome my blog',
            }} component={MainScreen}/>
            <AppStack.Screen name="Post" options={{
                title: 'Post №42',
                // headerBackTitle: 'Main',
                // headerBackTitleVisible: true
                // headerTintColor: 'yellow'
            }} component={PostScreen}/>
        </AppStack.Navigator>
    );
}
const BookedStack = createNativeStackNavigator();
const BookedStackNavigation = () => {
    return (
        <BookedStack.Navigator
            initialRouteName="Booked"
            screenOptions={navigatorOptions}>
            <BookedStack.Screen name="Booked" options={{
                title: 'Booked post',
            }} component={BookedScreen}/>
            <BookedStack.Screen name="Post" options={{
                title: 'Post №42',
                // headerBackTitle: 'Main',
                // headerBackTitleVisible: true
                // headerTintColor: 'yellow'
            }} component={PostScreen}/>


        </BookedStack.Navigator>
    );
}

const BookedTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
export const AppNavigation = () => {
    return (

            <BookedTabNavigator.Navigator
                activeTintColor='#fff'
                barStyle={{backgroundColor: THEME.MAIN_COLOR}}
                shifting
                screenOptions={
                    ({route}) => ({
                        tabBarLabel: route.name === 'Posts' ? 'All Posts' : 'Favorites',
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'Posts') {
                                iconName = focused
                                    ? 'ios-albums'
                                    : 'ios-albums-outline';
                            } else if (route.name === 'BookedPosts') {
                                iconName = focused ? 'ios-star' : 'ios-star-outline';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} color={'#fff'} size={25}/>;
                        },
                        tabBarActiveTintColor: THEME.MAIN_COLOR,
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false

                    })
                }>
                <BookedTabNavigator.Screen name="Posts" component={AppStackNavigation}/>
                <BookedTabNavigator.Screen name="BookedPosts" component={BookedStackNavigation}/>
            </BookedTabNavigator.Navigator>

    );
}
const AboutStack = createNativeStackNavigator();
const AboutNavigation = () => {
    return (
        <AboutStack.Navigator
            initialRouteName="AboutStack"
            screenOptions={navigatorOptions}>
            <AboutStack.Screen name="AboutStack" options={{
                title: 'AboutStack',
            }} component={AboutScreen}/>

        </AboutStack.Navigator>
    );
}
const CreateStack = createNativeStackNavigator();
const CreateNavigation = () => {
    return (
        <CreateStack.Navigator
            initialRouteName="Create"
            screenOptions={navigatorOptions}>
            <CreateStack.Screen name="CreateStack" options={{
                title: 'Create',
            }} component={CreateScreen}/>

        </CreateStack.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();
export const MainNavigation = () => {
    return (
        <NavigationContainer>
        <MainNavigator.Navigator screenOptions={{
            headerShown: false,
            drawerActiveTintColor: THEME.MAIN_COLOR,
            drawerLabelStyle: {
                fontFamily: 'open-sans-bold',
            }
        }}>
            <MainNavigator.Screen name="PostsTabs"  options={{
                drawerLabel: 'Main',
                // drawerIcon: () => <Ionicons name = 'ios-star' />
            }} component={AppNavigation}/>
            <MainNavigator.Screen name="About"  options={{
                drawerLabel: 'About app',
            }} component={AboutNavigation}/>
            <MainNavigator.Screen name="Create" options={{
                drawerLabel: 'New post',
            }} component={CreateNavigation}/>
        </MainNavigator.Navigator>
        </NavigationContainer>
    )
}
// <Drawer.Navigator
//     screenOptions={{
//         //options for drawer
//         drawerLabel
//         drawerIcon
//         drawerActiveTintColor
//         drawerActiveBackgroundColor
//         drawerInactiveTintColor
//         drawerInactiveBackgroundColor
//         drawerItemStyle
//         drawerLabelStyle
//         drawerContentContainerStyle
//         drawerContentStyle
//         drawerStyle
//     }}
// >
//     {/* screens */}
// </Drawer.Navigator>