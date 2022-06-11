import {getAuth,signInWithPopup}  from 'firebase/auth'
import {init} from "./firebase-configuration";

const auth=getAuth(init());
auth.onIdTokenChanged(async (user)=>{
    console.log("token ",user);
   await (user.getIdTokenResult(true)).then((tk)=>{
       state.accessToken=tk;
   }).catch((err)=>{
     console.log(err);
   });
});
export let state;
const AlreadyRegistered=(provider)=>{

}
const SocialMediaProvider =(provider)=>{
    return signInWithPopup(getAuth(),provider).then((r)=>
    {
        state=r;

    });
}
export default  SocialMediaProvider;
