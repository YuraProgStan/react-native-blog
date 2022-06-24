import React, {useEffect} from 'react';
import {DATA} from "../data";
import Post from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import PostList from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from '../redux/reducers-slices/postSlice'
import {StyleSheet, View, ActivityIndicator} from "react-native";
import {THEME} from "../theme";

const MainScreen = ({navigation}) => {


    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, date: post.date})
    }

    useEffect(() => {
        navigation.setOptions(
            {
                title: 'My blog',
                headerRight: () =>
                    (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item title={"Take photo"} iconName='ios-camera'
                                  onPress={() => navigation.navigate('Create')}/>
                        </HeaderButtons>
                    ),
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postActions.loadFetching())
    }, [dispatch]);
    const allPosts = useSelector(state => state.post.allPosts);
    const loading = useSelector(state => state.post.loading)
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR}/>
            </View>
        )
    }
    return <PostList data={allPosts} onOpen={openPostHandler}/>
};


export default MainScreen;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})