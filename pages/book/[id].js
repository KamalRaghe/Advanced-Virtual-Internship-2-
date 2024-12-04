import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import Book from "@/components/selected"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import BookId from "@/components/BookId"

export default function ForYouPage(){
  
  const [book, setBook] = useState([])
  const [loaded, setLoaded] = useState([])
  const router = useRouter()
  const {id} = router.query
  
      return(
        <div style={{display:"flex"}}>
             <SideBar></SideBar>
             <div>
                <NavBar></NavBar>
              <BookId></BookId>
              </div>
        </div>
      )
}