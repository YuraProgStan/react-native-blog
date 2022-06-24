import React from 'react';
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity,Platform} from 'react-native';
import {HeaderButton} from "react-navigation-header-buttons";
import {THEME} from "../theme";
import Ionicons from '@expo/vector-icons/Ionicons';

const AppHeaderIcon = (props) => {
 return (
 <HeaderButton
     {...props}
     iconSize={24}
     IconComponent={Ionicons}
               color={Platform.OS === 'android'? '#fff': THEME.MAIN_COLOR}/>
 );
};

export default AppHeaderIcon;

const styles = StyleSheet.create({})