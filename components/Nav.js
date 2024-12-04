import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { IoMdTime } from "react-icons/io";

export default function NavBar(){
    const [books, setBooks] = useState([])
    const [height, setHeight] = useState()
    const [search, setSearch] = useState('')
  
      async function fetchBooks(){
          if(search){
            const { data } = await axios.get(` https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`)
            setBooks(data)
            if(books.length < 4){
              setHeight(`${books.length*120}px`)
            }else{
              setHeight('480px')
            }
          }
        }
  
        useEffect(()=>{
          fetchBooks()
          
        },[])
   
    return (
        <>
            <div style={{width:"100vw",height:"16vh",borderBottom:"1px solid lightgrey",paddingRight:"100px",display:"flex",justifyContent:"end",alignItems:"center"}} >
                <input placeholder="Search for books" value={search} onChange = {(e) => {setSearch(e.target.value);console.log(e.target.value),fetchBooks()}}
                style={{zIndex:"100",backgroundColor:"#f1f6f4",border:"1px solid grey",paddingLeft:"20px",width:"280px",height:"40px"}} ></input>
                <button onClick={()=>console.log('e')} style={{zIndex:"100",backgroundColor:"#f1f6f4",border:"1px solid grey",height:"40px",width:"40px",display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <div style={{scale:"1.8",position:"relative",top:"2px"}} ><GoSearch></GoSearch></div>
                 </button>
            </div>
            <div className="searchModal" >
                {books.length > 0 && <div style={{zIndex:"200",backgroundColor:"white",overflowY:"scroll",height:height,width:"450px",marginRight:'100px',border:"1px solid lightgrey"}} >
                {books.map(book =>{ 
                       return <div key={book.id} className="center" style={{justifyContent:"start",borderTop:"1px solid lightgrey",margin:"15px",marginTop:"0px"}} onClick={()=>{router.push(`/book/${book.id}`)}}>
                              <img className="center" style={{margin:"15px",width:"80px",height:"70px",justifyContent:"start"}}  src={book.imageLink}></img>
                               <div style={{padding:"10px"}}>
                                  <div style={{fontWeight:"bolder",color:"#032b41"}}>{book.title}</div>
                                  <div style={{fontSize:"15px",color:"grey",padding:"10px 0px"}} >{book.author}</div>
                                  <IoMdTime></IoMdTime>
                                </div>                             
                            </div>
                        })}
                </div>}
            </div>
        </>
    )
}
