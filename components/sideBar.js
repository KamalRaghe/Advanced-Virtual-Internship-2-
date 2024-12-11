import { FaHouse, FaLessThanEqual } from "react-icons/fa6";
import { CiBookmark, CiSettings, CiCircleQuestion } from "react-icons/ci";
import { FaPenClip } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { MdLogout, MdLogin } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { auth } from "@/firebase";


export default function SideBar({small,open}){
    const [menu, setMenu] = useState("sideBar")
    const [close, setClose] = useState(false)
    const [overflow, setOverflow] = useState('')
    const [width, setWidth] = useState('100vh')
    const [login,setLogin] = useState(auth.currentUser?.uid)

    const router = useRouter()

    function Logout(){
        auth.signOut()
        setLogin(false)
        router.reload()
        window.localStorage.setItem('User', '')
        window.localStorage.setItem('uid', '')
    }

    useEffect(()=>{
        if(small){
            setWidth('87vh')
            setOverflow('scroll')
        }
        setLogin(window.localStorage.getItem('uid'))
        console.log(window.localStorage.getItem('uid'))
    },[])

    return(
        <div>
            <div className="center zero" style={{zIndex:"100",justifyContent:"end",fontSize:"30px",padding:"30px",width:"100vw",position:"fixed"}}>
                {close ? <IoClose onClick={()=>{setMenu("sideBar popOut");setClose(false)}} ></IoClose> :<IoMdMenu onClick={()=>{setMenu("sideBar popIn");setClose(true)}} ></IoMdMenu>}
           </div>
            <div className= {menu} style={{zIndex:"100",backgroundColor:"#f1f6f4",height: width,overflowY:overflow,padding:"10px",alignItems:"center",flexDirection:"column",position:"fixed"}}>
                <div className ="nav__img--mask">
                    <img className ="nav__img" style={{scale:"0.9"}} src={"/logo.png"} alt="logo" />
                </div>
                <div style={{scale:"1.3",position:"relative",top:"100px",display:"flex",justifyContent:"space-between",cursor:"pointer",flexDirection:"column",height:"60vh"}} >
                    <div className="side-bar__icon" onClick={()=>router.push('/for-you')}><FaHouse></FaHouse> <div style={{margin:"5px"}} ></div> Home </div>
                    <div className="side-bar__icon"><CiBookmark></CiBookmark> <div style={{margin:"5px"}} ></div>My library</div>
                    <div className="side-bar__icon"><FaPenClip></FaPenClip> <div style={{margin:"5px"}} ></div>Highlights </div>
                    <div className="side-bar__icon"><div style={{scale:"1.2",position:"relative",top:"2px"}} ><GoSearch></GoSearch></div> <div style={{margin:"5px"}} ></div>Search</div>
                    <div className="side-bar__icon" onClick={()=>router.push('/setting')} ><div style={{scale:"1.3",position:"relative",top:"2px"}} ><CiSettings></CiSettings></div> <div style={{margin:"5px"}} ></div>Settings</div>
                    <div className="side-bar__icon"><div style={{scale:"1.2",position:"relative",top:"2px"}} ><CiCircleQuestion></CiCircleQuestion></div> <div style={{fontSize:"13px",margin:'5px'}} >Help & Support</div></div>
                    {login ? <div onClick={Logout} className="side-bar__icon"><MdLogout></MdLogout> <div style={{margin:"5px"}} >Logout</div></div>:<div onClick={()=>{open()}} className="side-bar__icon"><MdLogin></MdLogin> <div style={{margin:"5px"}} >Login</div></div>}
                </div>
            </div>
        </div>
    )
}