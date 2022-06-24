import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Image, ScrollView, Alert} from 'react-native';
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {postActions, removePost, toggleBooked} from "../redux/reducers-slices/postSlice";

const PostScreen = ({route, navigation}) => {
    const {postId, date} = route.params;
    // const post = DATA.find(p => p.id === postId);
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId));

    const booked = post.booked;
    const [bookedState, setBookedState] = useState(booked)
    const dispatch = useDispatch();
    const bookedFind = useSelector(state => state.post.bookedPosts).some(post => post.id === postId);
    useEffect(() => {
        setBookedState(bookedFind)
    }, [bookedFind])

    const toggleHandler = () => {
        dispatch(postActions.toggleBookedFetching(post))
    }
    // useEffect(() => {
    //   navigation.setParams({toggleHandler})
    // },[toggleHandler])
    const removeHandler = () => {
        Alert.alert(
            "Delete post",
            "Are you sure to delete post?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", style: 'destructive',
                    onPress: () => {
                        dispatch(postActions.removePostFetching(postId));
                        navigation.navigate('Main');

                    }
                }
            ],
            {cancelable: false}
        );
    }
    if (!post) {
        return null
    }

    useEffect(() => {
        const iconName = bookedState ? 'ios-star' : 'ios-star-outline';

        navigation.setOptions(
            {
                title: 'My post from ' + new Date(date).toLocaleDateString(),
                headerRight: () =>
                    (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item title={"Take photo"} iconName={iconName}
                                  onPress={() => toggleHandler()}/>
                        </HeaderButtons>
                    ),
            }
        );

    }, [toggleHandler, bookedState])
    return (
        <ScrollView style={styles.center}>
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button onPress={removeHandler} title={'Delete'} color={THEME.DANGER_COLOR}/>
        </ScrollView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-regular'
    }
})