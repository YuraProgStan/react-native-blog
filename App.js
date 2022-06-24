import {StyleSheet, Text, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import {bootstrap} from "./src/bootstrap";
import {AppNavigation, MainNavigation} from "./src/navigation/AppNavigation";
import {useState} from "react";
import 'react-native-gesture-handler';
import {store} from "./src/redux/store";
import {Provider} from 'react-redux'


export default function App() {

    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => setIsReady(true)}
                onError={error => console.log(error)}
            />
        )
    }
    return (
        <Provider store={store}>
            <MainNavigation/>
        </Provider>
    )
}

const styles = StyleSheet.create({});
