import './App.css';
import {FacebookAuthProvider,getAuth,onAuthStateChanged} from "firebase/auth"
import SocialMediaProvider from './AuthenticationFacebook'
import {useState} from "react";
import {uploadImage} from './ImageUpload';
import {init} from "./firebase-configuration";
import {state} from "./AuthenticationFacebook"
function App() {
var logged;
init();
const provider=new FacebookAuthProvider();
const auth= getAuth(init());
const handleclick=async ()=>{
     await  SocialMediaProvider( provider);
     return console.log(logged);}
const [imageUpload,setImageUpload]= useState(null);
const handlephotos= async () =>{
    if(state!=null){
   var photo= uploadImage(imageUpload,  state.uid);
   console.log(photo);}
else{
    alert("User not conected");
    }}
    onAuthStateChanged(auth,(state)=>{
        if(state){

        }
    });

  return (
     <div>
       <button onClick={handleclick}>Sing in with Faceboook</button>
         <div>
             <input type="file" onChange={(event)=>{setImageUpload(event.target.files)}}/>
             <button onClick={handlephotos}>UploadPhoto</button>
         </div>
     </div>

  );
}

export default App;
