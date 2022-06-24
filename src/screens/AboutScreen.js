import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import PostList from "../components/PostList";
import {DATA} from "../data";

const AboutScreen = ({navigation}) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, date: post.date})
    }

    useEffect(() => {
        navigation.setOptions(
            {
                title: 'About',

                headerLeft: () =>
                    (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item title={"Toggle Drawer"} iconName='ios-menu'
                                  onPress={() => navigation.toggleDrawer()}/>
                        </HeaderButtons>
                    ),
            }
        );

    }, [])
    return (
        <View style = {styles.container}>
            <Text>This this the best app for own notes</Text>
            <Text>Version app <Text style={styles.version}>1.0.0</Text></Text>
        </View>
    )
};


export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    version: {
        fontFamily: 'open-sans-bold'
    }
})