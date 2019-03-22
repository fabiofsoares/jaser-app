import { AsyncStorage } from 'react-native';
    
const _storeData = async (key, obj) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(obj))
    } catch (error) {
        return error;
    }
};

async function _getData (key) {

    let value,collect;

    try {
        value = await AsyncStorage.getItem(key).then((values) => {
            collect = values;
        });
    } catch (error) {
      console.log('Error: ',error);
    }

    return collect;
}

module.exports = { _storeData, _getData }