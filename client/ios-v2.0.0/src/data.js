// Loads data stored locally
import AsyncStorage from '@react-native-async-storage/async-storage';
import state from './state';

/*

currentLang: null

history: {
    ru: {
        common: 2
    }
}

*/

// Create all required fields in storage if they don't exists
export async function initStorage(){
    const createIfNull = async (key, value) => {
        if(await AsyncStorage.getItem(key) == null)
            await AsyncStorage.setItem(key, value)
    }

    await createIfNull("history", JSON.stringify({}));
    
    // Load into memory
    state.history = await AsyncStorage.getItem("history");
    state.currentLang = await AsyncStorage.getItem("currentLang");
}

export async function flushStorage(){
    const data = await AsyncStorage.getAllKeys();
    await Promise.all(data.map(async key => await AsyncStorage.removeItem(key)));
    await initStorage();
}

export function getHistory(lang, table){
    return state.history[lang]?.[table];
}

export function setHistory(lang, table, id){
    state.history[lang] ??= {}
    state.history[lang][table] = id;
}

// export async function getHistory(lang, table){
//     const history = JSON.parse(await AsyncStorage.getItem("history"));
//     return history[lang]?.[table];
// }

export async function updateHistory(){
    await AsyncStorage.setItem("history", JSON.stringify(state.history));
}

export async function updateCurrentLang(){
    await AsyncStorage.setItem("currentLang", state.currentLang);
}

// export async function getCurrentLang(){
//     return await AsyncStorage.getItem("currentLang");
// }
// export async function setCurrentLang(lang){
//     return await AsyncStorage.setItem("currentLang", lang);
// }