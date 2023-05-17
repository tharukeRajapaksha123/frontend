// import firebase from '../firebase';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


async function uploadImage(file, dispatch) {
    // dispatch({
    //     type: "SET_LOADING",
    //     payload: true
    // })
    // const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child(`images/${file.path}`);

    // try {
    //     const snapshot = await fileRef.put(file);
    //     const url = await snapshot.ref.getDownloadURL();
    //     dispatch({
    //         type: "SET_LOADING",
    //         payload: true
    //     })
    //     return url;
    // } catch (error) {
    //     console.error("Error uploading image: ", error);
    //     dispatch({
    //         type: "SET_LOADING",
    //         payload: false
    //     })
    //     return null
    // }
    return "https://plus.unsplash.com/premium_photo-1666755275919-80c2eadbc6aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
}


export default { uploadImage }