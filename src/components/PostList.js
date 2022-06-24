import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {DATA} from "../data";
import Post from "./Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "./AppHeaderIcon";

const PostList = ({data, onOpen}) => {
if (!data.length){
   return <View style={styles.wrapper}>
       <Text style={styles.noItems}>There are no posts yet</Text>
   </View>
}
 return (
         <View style={styles.wrapper}>
             <FlatList data={data}
                       renderItem={({item}) => <Post post={item} onOpen={onOpen}/>}
                       keyExtractor={item => item.id.toString()}
             />
         </View>
     );
};

export default PostList;

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems:{
        fontFamily: 'open-sans-regular',
        textAlign: "center",
        marginVertical:10,
        fontSize: 18
    }
})