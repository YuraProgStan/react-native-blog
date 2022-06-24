import React, {useEffect} from 'react';
import {DATA} from "../data";
import Post from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import PostList from "../components/PostList";
import {useSelector} from "react-redux";

const BookedScreen = ({navigation}) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, date: post.date})
    }
    useEffect(() => {
        navigation.setOptions(
            {
                title: 'Favorites',
                headerLeft: () =>
                    (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item title={"Toggle Drawer"} iconName='ios-menu'
                                  onPress={() =>navigation.toggleDrawer()}/>
                        </HeaderButtons>
                    ),
            }
        );

    }, [])
    const bookedPosts = useSelector(state => state.post.bookedPosts);
    return <PostList data={bookedPosts} onOpen={openPostHandler}  />
};


export default BookedScreen;