import { AsyncStorage } from 'react-native';
    
const _storeData = async (key, obj) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(obj))
    } catch (error) {
        console.log(error)
    }
};

_getData = async (key) => {
    console.log('key', key)
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('_getData : ', value)
            return JSON.parse(value)
        }
    } catch (error) {
        return 'error ' + error;
    }
};

module.exports = { _storeData, _getData }