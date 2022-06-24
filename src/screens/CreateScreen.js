import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost, postActions} from "../redux/reducers-slices/postSlice";
import PhotoPicker from "../components/PhotoPicker";


const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const imgRef = useRef()
    const dispatch = useDispatch();
    // const img = 'https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg';

    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, date: post.date})
    }
    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            // img:imagePicker,
            booked: false
        }
        dispatch(postActions.addPostFetching(post));
        setText('');
        imgRef.current = null;
   setImageLoading(false);
        navigation.navigate('Main');

    }

    const photoPickHandler = (uri) => {
        imgRef.current = uri
    }
    useEffect(() => {
        navigation.setOptions(
            {
                title: 'Create',

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
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create new Post</Text>
                    <TextInput style={styles.textarea}
                               placeholder="Write text note"
                               value={text}
                               onChangeText={setText}
                               multiline
                    />
                    {/*<Image style={{width: '100%', height: 200, marginBottom: 10}} source={{uri: img }}/>*/}
                    <PhotoPicker imageLoading={imageLoading} setImageLoading = {setImageLoading} onPick={photoPickHandler}/>
                    <Button disabled={!text} title={'Create Post'} color={THEME.MAIN_COLOR} onPress={saveHandler}/>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
};

export default CreateScreen;

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'open-sans-regular',
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})