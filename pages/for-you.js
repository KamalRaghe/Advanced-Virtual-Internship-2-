
import SideBar from "@/components/sideBar"
import NavBar from "@/components/Nav"
import Book from "@/components/selected"
import Books from "@/components/Books"
import { useEffect, useState } from "react"
export default function ForYouPage(){
  const [books, setBooks] = useState([])
      return(
        <div style={{display:"flex"}}>
             <SideBar></SideBar>
             <div>
                <NavBar></NavBar>
                <Book></Book>
                <Books url= {"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"} name={'Recommended For You'} subName={'We think you’ll like these'} move={'735px'}/>
                <Books url= {"https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"} subName={'Browse those books'} move={'735px'} name={'Suggested Books'}/>
              </div>
        </div>
      )
}