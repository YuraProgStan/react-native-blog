import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {THEME} from "../theme";



const PhotoPicker = ({onPick, imageLoading, setImageLoading}) => {
    const [image, setImage] = useState(null)
    const takePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [16, 8],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageLoading(true);
            setImage(result.uri);
            onPick(result.uri);
        }
    }
    return (
        <View style={styles.wrapper}>
            <Button color={THEME.DANGER_COLOR} title={'upload photo'} onPress={takePhoto}/>
            {imageLoading && image && <Image style={styles.image} source={{uri: image}}/>}
        </View>
    );
};

export default PhotoPicker;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10
    },
})