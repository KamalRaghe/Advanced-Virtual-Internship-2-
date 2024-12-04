import axios from "axios"
import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import { useEffect, useState } from "react"
import { IoMdTime } from "react-icons/io";
import { CiBookmark, CiStar } from "react-icons/ci";
import { useRouter } from "next/router";
import { PiBookOpenText } from "react-icons/pi";
import { HiOutlineLightBulb, HiOutlineMicrophone  } from "react-icons/hi";
import Time from "./time";

export default function BookId(){
  const [book, setBook] = useState([])
  const router = useRouter()
  const {id} = router.query
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [subTitle, setSubTitle] = useState()
  const [averageRating, setAverageRating] = useState()
  const [totalRating, setTotalRating] = useState()
  const [audioLink, setAudioLink] = useState()
  const [type, setType] = useState()
  const [keyIdeas, setKeyIdeas] = useState()
  const [summary, setSummary] = useState()
  const [authorDescription, setAuthorDescription] = useState()
  const [tag, setTag] = useState()
  const [tag1, setTag1] = useState()
  const [tag2, setTag2] = useState()
  const [tags, setTags] = useState([])
  const[imageLink,setImageLink]= useState()

    async function fetchBook(){
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        setBook(data)
        if(data){
            window.localStorage.setItem('title', data.title)
            window.localStorage.setItem('author', data.author)
            window.localStorage.setItem('subtitle', data.subTitle)
            window.localStorage.setItem('totalRating', data.totalRating)
            window.localStorage.setItem('averageRating', data.averageRating)
            window.localStorage.setItem('audioLink', data.audioLink)
            window.localStorage.setItem('type', data.type)
            window.localStorage.setItem('keyIdeas', data.keyIdeas)
            window.localStorage.setItem('summary', data.summary )
            window.localStorage.setItem('authorDescription', data.authorDescription)
            window.localStorage.setItem('imageLink', data.imageLink)
            window.localStorage.setItem('tag', data.tags[0])
            if(data.tags > 1){
                window.localStorage.setItem('tag1', data.tags[1])
            }else{
                window.localStorage.setItem('tag1', '')
            }
            if(data.tags > 2){
                window.localStorage.setItem('tag2', data.tags[2])
            }else{
                window.localStorage.setItem('tag2', '')
            }
        }
      }

      useEffect(()=>{
        fetchBook()
       setTimeout(() => {
            setTitle(window.localStorage.getItem('title'))
            setAuthor(window.localStorage.getItem('author'))
            setTotalRating(window.localStorage.getItem('totalRating'))
            setSubTitle(window.localStorage.getItem('subtitle'))
            setAverageRating(window.localStorage.getItem('averageRating'))
            setAudioLink(window.localStorage.getItem('audioLink'))
            setImageLink(window.localStorage.getItem('imageLink'))
            setType(window.localStorage.getItem('type'))
            setKeyIdeas(window.localStorage.getItem('keyIdeas'))
            setSummary(window.localStorage.getItem('summary'))
            setAuthorDescription(window.localStorage.getItem('authorDescription'))
            setTag(window.localStorage.getItem('tag'))
            setTag1(window.localStorage.getItem('tag1'))
            setTag2(window.localStorage.getItem('ta2'))
            let min = window.localStorage.getItem('minute')
            setMinute(min)
            let sec = window.localStorage.getItem('second')
            setSecond(sec)
       }, 1000);
       setTimeout(() => {
        if(tag2){
            setTags([tag, tag1, tag2])
        }else{
            if(tag1){
                setTags([tag, tag1])
            }else{
                if(tag){
                    setTags([tag])
                }
            }
        } 
       }, 2000);
        
        console.log(window.localStorage.getItem('audioLink'))
      },[])
      return(
        <div >
                <div className="BookScreen" style={{display:"flex",justifyContent:"space-between"}}>            
                    <div style={{padding:"10px"}} >
                        {title ? <div style={{width:"600px",display:"flex",justifyContent:"start",color:"#032b41",fontSize:"40px",margin:"10px",fontWeight:"bolder"}}>{title}</div>:<div className="skeleton" style={{width:"600px",height:"80px"}} ></div>}
                        {author ? <div style={{margin:"20px 10px",fontWeight:"bold"}} >{author}</div>:<div className="skeleton" style={{width:"150px",height:"30px",margin:"20px 0px"}} ></div>}
                        {subTitle ? <div style={{margin:"10px",fontSize:"25px"}} >{subTitle}</div>:<div className="skeleton" style={{width:"400px",height:"60px"}} ></div>}
                        <div style={{display:"flex",marginTop:"50px"}} >
                            {totalRating ? <div className="center" style={{justifyContent:"start",width:"200px"}}>
                                <CiStar style={{scale:"1.5"}} /> 
                                <div style={{padding:"5px"}} >{averageRating} ({totalRating} ratings)</div>
                            </div>:<div className="skeleton" style={{width:"100px",height:"20px"}} ></div>}
                            {audioLink ? <div className="center" style={{justifyContent:"space-between"}}>
                                <IoMdTime style={{scale:"1.7"}}></IoMdTime>
                                <div style={{padding:"10px"}} ><Time audioUrl={audioLink} ></Time></div>
                            </div>:<div className="skeleton" style={{width:"100px",height:"20px",marginLeft:"80px"}} ></div>}
                        </div>
                        <div style={{display:"flex",marginTop:"20px"}} >
                            {type ? <div className="center" style={{width:"115px",justifyContent:"space-between"}}>
                                <HiOutlineMicrophone  style={{scale:"1.5"}} /> 
                                {type}
                            </div>:<div className="skeleton" style={{width:"100px",height:"20px"}} ></div>}
                            {keyIdeas ? <div className="center" style={{width:"105px",justifyContent:"space-between",marginLeft:"85px"}}>
                                <HiOutlineLightBulb style={{scale:"1.5"}} /> 
                                 <div>{keyIdeas} Key Ideas</div>
                            </div>:<div className="skeleton" style={{width:"100px",height:"20px",marginLeft:"80px"}} ></div>}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",width:"300px",marginTop:"30px"}} >
                        {audioLink ? <button className='center' style={{backgroundColor:"#032b41",color:'white',padding:"15px 40px",fontSize:"22px",borderRadius:"5px"}}> 
                            < PiBookOpenText/>  <div style={{marginLeft:"5px",fontSize:"16px"}}>Read</div> 
                        </button>:<button className='center skeleton' style={{padding:"15px 40px",color:"transparent",fontSize:"22px",borderRadius:"5px"}} >Hello</button>}  
                        {audioLink ? <button className='center' style={{backgroundColor:"#032b41",color:'white',padding:"15px 40px",fontSize:"22px",borderRadius:"5px"}}> 
                             <HiOutlineMicrophone/>  <div style={{fontSize:"16px"}} onClick={()=>router.push(`/player/${id}`)} >Listen</div>
                        </button>:<button className='center skeleton' style={{padding:"15px 40px",color:"transparent",fontSize:"22px",borderRadius:"5px"}} >World</button>}  
                        </div>
                        <div className="side-bar__icon" style={{fontSize:"20px",color:"blue",padding:"20px 0px"}} ><CiBookmark></CiBookmark> <div style={{margin:"5px"}} ></div>{imageLink && <div>Add title to My library</div>}</div>
                        {summary && <div style={{fontSize:"18px",fontWeight:"bold",paddingBottom:"10px"}}>What's it about?</div>}
                        <div style={{display:"flex"}}>
                            {tags && tags.map(tag =>{
                                return <div key={tag} style={{fontSize:"16px",margin:"10px 0px",marginRight:"10px",display:"flex",backgroundColor:"#f1f6f4",padding:'15px 20px'}}>{tag}</div>
                            })}
                        </div>
                        <div>
                            {summary ? summary :<div className="skeleton" style={{width:"800px",height:"700px"}}></div>}
                        </div>
                        {authorDescription && <div style={{fontSize:"18px",fontWeight:"bold",padding:"20px"}}>About the author</div>}
                        <div>
                            {authorDescription ? authorDescription:<div className="skeleton" style={{width:"800px",height:"700px"}}></div>}
                        </div>
                    </div>
                    <div >
                        {imageLink ? <img style={{width:"280px",height:"300px",margin:"10px"}} src={imageLink}></img>:<div className="skeleton" style={{width:"270px",height:"300px",margin:"10px 100px",position:"relative",right:"220px"}}></div>}
                    </div>
                    
                      
        
                </div>
        </div>
      )
}