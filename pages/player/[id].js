import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import Book from "@/components/selected"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Player from "@/components/player"
import AudioPlayer from "@/components/audio"

export default function ForYouPage(){
  const [loaded,setLoaded] = useState()
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [audioLink, setAudioLink] = useState()
  const [image, setImage] = useState()
  const router = useRouter()
  const {id} = router.query

 

  useEffect(()=>{
    setTimeout(() => {
      setLoaded(true)
    }, 1000);
      setTitle(window.localStorage.getItem('title'))
      setAuthor(window.localStorage.getItem('author'))
      setAudioLink(window.localStorage.getItem('audioLink'))
      setImage(window.localStorage.getItem('imageLink'))
  },[])

 

      return(
        <div style={{display:"flex"}}>
             <SideBar small={true} ></SideBar>
             {loaded ? <AudioPlayer audioUrl={audioLink} title = {title} img = {image} author={author}/>:<div className="skeleton" style={{width:"100%",height:"100px",position:"fixed",top:"87%"}}></div>}
             <div>
                <NavBar></NavBar>
                <Player url={id}/>
              </div>
        </div>
      )
}