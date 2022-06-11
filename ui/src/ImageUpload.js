import {getStorage} from 'firebase/storage';
// import {init} from "./firebase-configuration";
import {ref,uploadBytes} from "firebase/storage";

// const storage=getStorage(init());
export const uploadImage = (imageUpload,eventid)  =>{
    if(imageUpload==null) return;
    const imageRef= ref(getStorage(),`images/${eventid}/${imageUpload[0].name}`);
    console.log(imageUpload);
   return  uploadBytes(imageRef,imageUpload).then(()=>{
       alert("Image uploaded")
    })
       .catch((err)=>{
         console.log(err);
       })
};
