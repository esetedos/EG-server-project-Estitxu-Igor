import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SECRET} from '@env'

export const setSecureValue = async (key, value) => {
    console.log("SETTING SECURE VALUE")
    await Keychain.setInternetCredentials(key, KEYCHAIN_SECRET, value)   
 }
 
export const getSecureValue = async (key) => {
    console.log("GETTING SECURE VALUE")
    const result = await Keychain.getInternetCredentials(key)
    if (result) {
        return result.password  
    }
return false
}

export const removeSecureValue = async (key) => {
    console.log("REMOVING SECURE VALUE")
    await Keychain.resetInternetCredentials(key)
}

