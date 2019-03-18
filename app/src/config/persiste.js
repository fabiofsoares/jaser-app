import { AsyncStorage } from 'react-native';
    
const _storeData = async (key, obj) => {
    console.log('key -->', key)
    console.log('obj -->', obj)
    try {
        await AsyncStorage.setItem(key, JSON.stringify(obj))
    } catch (error) {
        console.log(error)
    }
};

_getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('parsed ', value.langue)
            return JSON.parse(value)
        }
    } catch (error) {

        return 'error ' + error;
    }
};

module.exports = { _storeData, _getData }