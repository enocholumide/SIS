import { datakeys } from './constants.js'
import { AsyncStorage } from 'react-native'
import FAKEDATA from './fakeData.js'

export default class DataStore {


    static async storeFakeDataToLocalStorage() {

        console.log('will store all fake data to local storage now')

        try {
            const data_status = await AsyncStorage.getItem('data_status');
            if (data_status !== null) {
                if (data_status === 'saved') {
                    console.log('Data has been saved already');
                }
            } else
                this.proceedToStoreAllFakeData()
        } catch (error) {
            console.log('Error retrieving your data ' + error)
        }
    }

    static async proceedToStoreAllFakeData() {

        console.log('App in development mode and there is no data in the current device it is running')
        console.log('Now storing fake data into the local storage')

        try {

            for (let item of FAKEDATA) {

                await AsyncStorage.setItem(item.key, JSON.stringify(item.data));
                console.log(item.key + " saved")

            }

            await AsyncStorage.setItem('data_status', 'saved');

        } catch (error) {
            console.log('Cannot store data' + error);
        }


        console.log('Storage completed, app can now run in demo mode, with fake data')

    }

}