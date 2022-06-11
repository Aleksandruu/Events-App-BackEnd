import {initializeApp} from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyCSogs2pVnN5IJ3cxFKQSij7k2DHIEYSCE",
    authDomain: "eventsjoydb.firebaseapp.com",
    projectId: "eventsjoydb",
    storageBucket: "eventsjoydb.appspot.com",
    messagingSenderId: "928877298623",
    appId: "1:928877298623:web:d6a045d0e8d0e477cf970a",
    measurementId: "G-89DNS7LZEX"
};
// const app= initializeApp(firebaseConfig);
export const  init= ()=>{
     return initializeApp(firebaseConfig);
}

