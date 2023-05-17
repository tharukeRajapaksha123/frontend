import firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCb7Yo6jbsA30D0P8eQEtWLkrNAMeuQw4U",
    authDomain: "marioblog-ad8e5.firebaseapp.com",
    projectId: "marioblog-ad8e5",
    storageBucket: "marioblog-ad8e5.appspot.com",
    messagingSenderId: "134259039673",
    appId: "1:134259039673:web:d7b32a238ef0492bbeea68"
};



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default { storage }