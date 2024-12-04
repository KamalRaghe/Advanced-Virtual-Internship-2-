import axios from "axios"
import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import { useRef, useEffect, useState } from "react"
import { IoMdTime } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { useRouter } from "next/router";
import AudioPlayer from "./audio";
import Time from "./time";

export default function Books({url,name,move,subName}){
  const [books, setBooks] = useState([1,2,3,4,5])
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  

    async function fetchBooks(){
        const { data } = await axios.get(url)
        setBooks(data)
        setLoaded(true)
        console.log(data)
      }

      useEffect(()=>{
        setTimeout(() => {
          fetchBooks()
        }, 1000);
      },[])
      return(
        <div >
                <div className="BookScreen" style={{position:"relative",display:"flex",justifyContent:"start",marginBottom:"150px"}}>            
                    <div style={{position:"relative",left:"30px"}}>
                      <div style={{width:"700px",height:"25px",display:"flex",justifyContent:"start",color:"navy",fontSize:"20px",fontWeight:"bolder"}} >{name}</div>
                      <br></br>
                      <div>{subName}</div>
                    </div>
                    {loaded ? <div className="faded" style={{display:"flex",position:"relative",right:move,bottom:"0px"}}>
                        {books.map(book =>{
                        return <div key={book.id} onClick={()=>{router.push(`/book/${book.id}`)}} style={{scale:"0.29",width:"200px",height:"300px",position:"relative"}} >
                              {book.subscriptionRequired && <div className="center" style={{backgroundColor:"black",fontSize:"40px",position:"absolute",top:"-110px",left:'250px',borderRadius:"60px",width:"380px",height:"90px",color:"white"}} >Premium</div>}
                              <img src={book.imageLink}></img>
                              <div className="center" style={{justifyContent:"start",width:"600px",color:"navy",fontSize:"60px",fontWeight:"bolder",padding:"10px"}}>{book.title}</div>
                              <div className="center" style={{justifyContent:"start",width:"600px",color:"grey",fontSize:"50px",padding:" 0 10px"}}>{book.author}</div>
                              <div className="center" style={{justifyContent:"start",width:"600px",fontSize:"45px",padding:"10px"}}>{book.subTitle}</div>
                              <div className="center" style={{justifyContent:"start",width:"600px",fontSize:"50px",padding:" 5px 10px"}}>
                                  <div className="center" style={{display:"flex"}} ><IoMdTime></IoMdTime> <div style={{padding:"10px"}} ><Time  audioUrl={book.audioLink} ></Time></div></div>
                                  <div><CiStar  style={{marginLeft:"10px"}} /> {book.averageRating}</div>
                                </div>
                             
                            </div>
                        })}
                    </div>:
                    <div style={{display:"flex",margin:"0px"}}>
                      {books.map(book =>{
                          return <div style={{position:"relative",right:"680px",top:"100px",margin:"0px 20px"}} key={book} >
                            <div className="skeleton" style={{width:"140px",height:"180px"}} ></div>
                            <div  className="skeleton" style={{width:"150px", height:"20px",margin:"10px 0px"}} ></div>
                            <div  className="skeleton" style={{width:"50px", height:"15px",margin:"10px 0px"}} ></div>
                            <div  className="skeleton" style={{width:"100px", height:"25px",margin:"10px 0px"}} ></div>
                            <div style={{display:"flex"}}>
                              <div  className="skeleton" style={{width:"50px", height:"15px",margin:"10px 0px"}} ></div>
                              <div  className="skeleton" style={{width:"50px", height:"15px",margin:"10px 15px"}} ></div>
                            </div>
                          </div>
                      })}
                    </div>}
                </div>
        </div>
      )
}