import { useState } from "react"
import { useRouter } from "next/router"
import { provider, auth } from "@/firebase"
import { IoPersonSharp} from "react-icons/io5";
import { signInWithPopup,
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signInAnonymously 
} from "firebase/auth"


export default function Modal({close}){
    const [login, setLogin] = useState(true)
    const [message, setMessage] = useState()
    const [account, setAccount] = useState({
        title:"", 
        password:""
        })

        const router = useRouter()

        function signIn(){
          const email = account.title
          const password = account.password
          window.localStorage.setItem('User', `${auth.currentUser?.email}`)
          window.localStorage.setItem('uid', `${auth.currentUser?.uid}`)
          signInWithEmailAndPassword(auth,email,password).then(()=>{
            router.push('/for-you')
          }).catch(err =>{
            setMessage(err.message)
            setTimeout(() => {
                setMessage()
            }, 4000);
          })
        }
        
        function Forgot(){
          const email = account.title
          fetchUsers()
          if(email){
            sendPasswordResetEmail(auth, email).then(()=>{setMessage('Check your email')})
          }else{
            setMessage('Put in your email') 
          }
        }
      
        function CreateUser(e){
          e.preventDefault()
          const email = account.title
          const password = account.password
          window.localStorage.setItem('User', `${auth.currentUser?.email}`)
          window.localStorage.setItem('uid', `${auth.currentUser?.uid}`)
          createUserWithEmailAndPassword(auth,email,password).then(()=>{
            router.push('/for-you')
          }).catch(err =>{
            setMessage(err.message)
            setTimeout(() => {
                setMessage()
            }, 4000);
          })
      }

      function signInWithGoogle(){
        window.localStorage.setItem('User', `${auth.currentUser?.email}`)
        window.localStorage.setItem('uid', `${auth.currentUser?.uid}`)
        signInWithPopup(auth, provider).then(
            router.push('/for-you')
        )
      }

      function signInAnonymous(){
        signInAnonymously(auth).then(
            router.push('/for-you')
        )
      }

    return (
        <div>
            {login ? <div className="modal">
                <div style={{display:"flex",justifyContent:"end",alignItems:"start",height:"35px"}} >
                    <button onClick={close}  style={{fontSize:"40px",border:"none",marginLeft:"20px"}} >x</button>
                </div>
                <br></br>
                <p className="modal__title">Log in to Summarist</p>
               <div style={{color:"red"}}  >{message}</div>
                <div className="modal__buttons">
                    <button onClick={signInAnonymous} className="modal-btn" style={{backgroundColor:"#0564f1",color:"white",margin:"8px"}} >
                        <div style={{fontSize:"30px",position:"relative",top:"3px",left:"5px"}} >
                            <IoPersonSharp/>
                        </div>
                        Login as a Guest
                        <div style={{fontSize:"30px",color:"transparent"}} ><IoPersonSharp/></div>
                    </button>
                </div>
               
                <div style={{display:"flex",justifyContent:"space-between",margin:"10px",width:"95%"}}>
                    <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
                    or
                    <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
                </div>
               
                <div className="modal__buttons">
                <button onClick={signInWithGoogle} className="modal-btn" style={{backgroundColor:"#0365f2",color:"white"}} >
                    <div style={{backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"5px"}} >
                        <img style={{scale:"0.25"}} src="google.png" alt="logo" /></div>
                        Login with Google
                        <div style={{fontSize:"30px",color:"transparent"}} ><IoPersonSharp/>
                    </div>
                </button>
                </div>
               
                <div style={{display:"flex",justifyContent:"space-between",margin:"10px",width:"95%"}}>
                    <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
                    or
                    <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
                </div>
               
                <input style={{width:"366px",height:"35px",marginBottom:"8px",padding:"8px"}} placeholder="Email Address" name='email' type='email' value={account.title} onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
               
                <input style={{width:"366px",height:"35px",marginBottom:"8px",padding:"8px"}} placeholder="password" value={account.password} onChange = {(e) => setAccount({...account, password: e.target.value})} ></input>
               
                <div className="modal__buttons">
                    <button onClick={signIn} style={{justifyContent:"center",margin:"16px"}} className="modal-btn" >Login</button>
                </div>
                <div><button onClick={Forgot} style={{color:"#0365f2",margin:"16px",fontSize:"16px"}} > Forgot password? </button></div>
                <div><button onClick={()=>setLogin(false)} style={{color:"#0365f2",fontSize:"16px"}} > Don't have an account? </button></div>
            </div>: 
            <div className="modal">
            <div style={{display:"flex",justifyContent:"end",alignItems:"start",height:"35px"}} >
                <button onClick={close}  style={{fontSize:"40px",border:"none",marginLeft:"20px"}} >x</button>
            </div>
            <br></br>
            <p className="modal__title">Sign up to Summarist</p>
            <div style={{color:"red"}}  >{message}</div>
            <br></br>
            <div className="modal__buttons">
            <button onClick={signInWithGoogle} className="modal-btn" style={{backgroundColor:"#0365f2",color:"white"}} >
                <div style={{backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"5px"}} >
                    <img style={{scale:"0.25"}} src="google.png" alt="logo" /></div>
                    Sign up with Google
                    <div style={{fontSize:"30px",color:"transparent"}} ><IoPersonSharp/>
                </div>
            </button>
            </div>
           
            <div style={{display:"flex",justifyContent:"space-between",margin:"10px",width:"95%"}}>
                <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
                or
                <div style={{borderBottom:"1px solid black",width:"35%",position:"relative",bottom:"8px",opacity:"0.5" }}></div>
            </div>
           
            <input style={{width:"366px",height:"35px",marginBottom:"8px",padding:"8px"}} placeholder="Email Address" name='email' type='email' value={account.title} onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
           
            <input style={{width:"366px",height:"35px",marginBottom:"8px",padding:"8px"}} placeholder="password" value={account.password} onChange = {(e) => setAccount({...account, password: e.target.value})} ></input>
           
            <div className="modal__buttons">
                <button onClick={CreateUser} style={{justifyContent:"center",margin:"16px"}} className="modal-btn" >Sign up</button>
            </div>
            <div><button onClick={()=>setLogin(true)} style={{color:"#0365f2",fontSize:"16px"}} > Already have an account? </button></div>
        </div>}
            <div onClick={close} className="backdrop" />
        </div>
    )
}