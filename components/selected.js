import axios from "axios"
import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import { useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa";
import Time from "./time";
export default function Book(){
  const [book, setBook] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [move, setMove] = useState('23px')

    async function fetchBooks(){
        const { data } = await axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected')
        setBook(data[0])
        setMove('0px')
        setLoaded(true)    
      }

      useEffect(()=>{
        setTimeout(() => {
          fetchBooks()
        }, 1000);
      },[])
      return(
        <div >
                <div  className="BookScreen" style={{position:"relative",margin:"20px",marginBottom:"100px"}}>            
                    <div style={{width:"700px",height:"25px",display:"flex",justifyContent:"start",color:"navy",fontSize:"20px",fontWeight:"bolder",marginBottom:"20px"}} >Selected just for you</div>
                      {loaded ? <div className="faded" style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:"beige",width:"35%",height:"180px",padding:"20px"}} >
                        {book ? <div style={{width:"400px",position:"relative",bottom:"30px"}} >{book.subTitle}</div>:<div className="skeleton" style={{width:"350px", height:"40px",position:"relative",bottom:"30px"}} ></div>}
                        <div className="center" style={{borderRight:"1px solid lightblue",height:"90%",width:"10px"}} ></div>
                        {book ? <div key={book.id} style={{scale:"0.24",width:"200px",height:"300px",position:"relative",bottom:"30px"}} >
                            <img src={book.imageLink}></img>
                        </div>:<div className="skeleton" style={{width:"150px",height:"150px",margin:"20px",position:"relative",left:"40px"}}></div>}
                        <div style={{height:"100%",width:"300px",position:"relative",left:"20px",top:"10px"}} >
                            {book ? <div className="center" style={{justifyContent:"start",fontWeight:"bolder"}}>{book.title}</div>:<div className="skeleton" style={{width:"75px", height:"20px",position:"relative",left:"30px"}} ></div>}
                            {book ? <div className="center" style={{justifyContent:"start",scale:"0.8",position:"relative",right:"17px"}}>{book.author}</div>:<div className="skeleton" style={{width:"45px", height:"15px",marginTop:"10px",position:"relative",left:"30px"}} ></div>}
                            <div style={{display:"flex",alignItems:"center",marginTop:"20px"}} >
                              <div className="center" style={{position:"relative",left: move,backgroundColor:"black",color:"white",borderRadius:"50%",width:'40px',height:'40px'}}>
                                <FaPlay></FaPlay> 
                              </div>
                              {book ? <div style={{padding:'10px'}} >3 mins 23 secs</div>:<div style={{padding:'10px',position:"relative",left:"20px"}} >0 mins 00 secs</div>}
                            </div>
                        </div>
                    </div>:<div className="skeleton" style={{width:"650px",height:"180px"}} ></div>}
                </div>
        </div>
      )
}