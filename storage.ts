import AsyncStorage from '@react-native-async-storage/async-storage';
import reduxStore from './redux/store'
import { NotificationStatus } from './redux/notification.reducer';
import {LanguagString} from '../lib/stringLang';
let images = []
export const asyncStoreData = async (key: string, data: any) => {
    try {
        await AsyncStorage.setItem(
            `@Operative:${key || new Date().getTime()}`,
            data
        );

    } catch (error) {
     console.log("errorerror ",error)
    }
}

export const asyncStoreScreenKey = async (key: string, data: any) => {
    try {
        await AsyncStorage.setItem(
            `@Operative:${key}`,
            data
        );

    } catch (error) {

    }
}

export const asyncFetchScreenKey = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@Operative:${key}`);
        if (value) {

            return value;
        }
    } catch (error) {

    }
}

export const asyncFetchData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@Operative:${key}`);
        if (value) {

            return value;
        }
    } catch (error) {
        console.log("errorerror3 ",error)
       
    }
}
export const asyncFetchData2 = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@Operative:${key}`);
        // console.log("value ",value)
        if (value) {

            return JSON.parse(value);
        }
    } catch (error) {
        reduxStore.dispatch({ type: 'notification/add', notification: { id:new Date().getTime(),duration: 2, status: NotificationStatus.ERROR, message:  LanguagString.errorStore } })
    }
}

export const asyncStoreInArray = async (storageKey: string, value: any) => {
    try {
        let map = await asyncFetchData2(storageKey);
        if (map) {
            map.push(value);
        } else {
            map = [value];
        }
        try {
            images = map
            await asyncStoreData(storageKey, JSON.stringify(map));

        } catch (error) {
            console.log("errorerror1 ",error)
        }
    } catch (error) {
        console.log("errorerror2 ",error)
    }
}

export const asyncFetchfromArray = async (storageKey: string, value: any) => {
    try {
        const value = await AsyncStorage.getItem(`${storageKey}`);
        if (value) {
            return JSON.parse(value);
        }
    } catch (error) {

    }
}


export const asyncFetchArray = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`@Operative:${key}`);
        if (value) {

            return JSON.parse(value);
        }
    } catch (error) {

    }
}

export const asyncDeleteData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(`@Operative:${key}`)

    } catch (error) {

    }
}
