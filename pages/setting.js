import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import { db, auth} from "@/firebase";
import { addDoc, collection, onSnapshot, query, where} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Modal from "@/components/modal";

export default function Setting(){
    const [payed, Payed] = useState()
    const [modal, setModal] = useState()
    const [user, setUser] = useState()
    const [type, setType] = useState()
    const router = useRouter()
    async function PayedCheck() {
        const userId = window.localStorage.getItem('uid')
        if(userId) {
            const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
            const q = query(
            subscriptionsRef,
            where("status", "in", ["trialing", "active"])
            );
        
            const promise = new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                if (snapshot.docs.length === 0) {
                    Payed(false);
                    setType('')
                } else {
                    Payed(true);
                    setType(window.localStorage.getItem('payment'))
                }
                unsubscribe();
                },
                reject
            );
            });
        }else{
            setModal(true);
        }
      };
    
    useEffect(() =>{
        PayedCheck()
        console.log(auth)
        setUser(window.localStorage.getItem('User'))
      })
        return(
          <div style={{display:"flex"}}>
               <SideBar></SideBar>
               <div >
                    <NavBar></NavBar>
                    <div className="BookScreen">
                        <div style={{color:"#032b41",fontSize:"32px",fontWeight:"bolder",margin:"10px",marginBottom:"30px",padding:"20px 0px",borderBottom:"1px solid lightgrey"}} >Settings</div>
                        <div style={{marginLeft:"10px"}}>
                            <div style={{color:"#032b41",fontSize:"18px",fontWeight:"bolder"}}>Your Subscription plan</div>
                            <div style={{color:"#032b41",paddingTop:"10px",paddingBottom:"20px"}} >{type ? type: 'Basic'}</div>
                            {!type && <button onClick={()=>router.push('/choose-plan')} className="btn" style={{width:"100px",marginBottom:"20px"}}> Upgrade to Premium</button>}
                            <div style={{borderBottom:"1px solid lightgrey"}} ></div>
                            {user && <div style={{color:"#032b41",fontSize:"18px",fontWeight:"bolder",marginTop:"30px",paddingBottom:"10px"}} >Email</div>}
                            <div>{user}</div>
                            {modal && <Modal close={()=>setModal(false)} />}
                        </div>
                    </div>
                </div>
          </div>
        )
  }