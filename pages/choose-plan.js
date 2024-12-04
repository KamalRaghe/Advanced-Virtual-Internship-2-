
import { LuFileKey } from "react-icons/lu";
import {  PiPottedPlantFill} from "react-icons/pi"
import { FaHandshake } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react"
import { db, initFirebase } from "@/firebase";
import { addDoc, collection, onSnapshot, query, where} from "firebase/firestore"
import { useRouter } from "next/router";
import Modal from "@/components/modal";
export default function ForYouPage(){
  const [on1, setOn1] = useState(true)
  const [on2, setOn2] = useState()
  const [modal, setModal] = useState(false)
  const [cover1, setCover1] = useState('cover')
  const [cover2, setCover2] = useState('cover')
  const [cover3, setCover3] = useState('cover')
  const [cover4, setCover4] = useState('cover')
  const [border1, setBorder1] = useState("4px solid #20ba68")
  const [border2, setBorder2] = useState("4px solid gray")

  const router = useRouter()

  async function getCheckoutUrl(price,type){
    if(type === 'premium-plus'){
        window.localStorage.setItem('payment', type)
    }else{
        if(type === 'premium'){
            window.localStorage.setItem('payment', type)
        }
    }
    const userId = window.localStorage.getItem('uid');
    if(userId){
      const checkoutSessionRef = collection(
        db,
        "customers",
        userId,
        "checkout_sessions"
      );

      const docRef = await addDoc(checkoutSessionRef, {
        price: price,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      const promise = new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
          const { error, url } = snap.data() || {};
          if (error) {
            unsubscribe(); 
          }
          if (url) {
            unsubscribe(); 
            router.push(url);
          }
        });
      });
    }else{
      setModal(true)
    }
    
    };
      return(
        <div>
             <div className="center" style={{zIndex:"100",flexDirection:"column",justifyContent:"space-between",height:"95vh",width:"100vw",backgroundColor:"#032b41",borderBottomRightRadius:"30%",borderBottomLeftRadius:"30%"}}>
                <div style={{textAlign:"center",fontSize:"50px",width:"1000px",color:"white",marginTop:"40px",fontWeight:"bolder"}} >Get unlimited access to many amazing books to read</div>
                <div style={{color:"white",fontSize:"20px"}} >Turn ordinary moments into amazing learning opportunities</div>
                <div className="center" style={{zIndex:"2",height:"300px",width:"350px",backgroundColor:"white",borderTopRightRadius:"50%",borderTopLeftRadius:"50%"}} >
                    <img style={{scale:"0.4",zIndex:"1",borderRadius:"50%"}} src="pricing-top.png" alt="logo" />
                </div>
            </div>
            <div className="center" style={{paddingBottom:"160px"}}> 
                <div className="center" style={{justifyContent:'space-between',width:"250px",scale:"3.5",paddingTop:"40px",color:"#032b41"}} >
                    <div className="center" style={{flexDirection:"column"}} >
                        <LuFileKey/>
                        <span style={{fontSize:"5px",paddingTop:"10px", width:"70px",textAlign:"center"}} ><span style={{fontWeight:"bolder"}} >Key ideas in few min</span> with many books to read</span>
                    </div>
                    <div className="center" style={{flexDirection:"column"}} >
                        <PiPottedPlantFill/>
                        <span style={{fontSize:"5px",paddingTop:"10px", width:"70px",textAlign:"center"}} ><span style={{fontWeight:"bolder"}} >3 million</span> people growing with Summarist everyday</span>
                    </div>
                    <div className="center" style={{flexDirection:"column"}}>
                        <FaHandshake/>
                        <span style={{fontSize:"5px",paddingTop:"10px", width:"70px",textAlign:"center"}} ><span style={{fontWeight:"bolder"}} >Precise recommendations</span> collections curated by experts</span>
                    </div>
                </div>
            </div>
            {modal && <Modal close={()=>setModal()} ></Modal>}
            <div className="center" style={{flexDirection:"column"}} onClick={()=>{setOn1(true);setOn2(),setBorder1("4px solid #20ba68"),setBorder2("4px solid gray")}}>
                <div style={{fontSize:"30px",fontWeight:"bolder",color:"#032b41"}} >Choose the plan that fits you</div>
                <div className="center" style={{justifyContent:'start',border:border1,width:"650px",height:"140px",margin:"20px",backgroundColor:"#f1f6f4",borderRadius:"8px"}}>
                    <button onClick={()=>{setOn1(true);setOn2(),setBorder1("4px solid #20ba68"),setBorder2("4px solid gray")}} className="center" style={{width:"25px",height:"25px",borderRadius:"50%",border:"2px solid black",margin:"20px",position:"relative",bottom:"30px"}}>
                        {on1 && <span style={{backgroundColor:"black",width:"6px",height:"6px",borderRadius:"50px"}} ></span>}
                    </button>
                    <div>
                        <div style={{padding:"5px",fontWeight:"bolder",fontSize:"20px",color:"#032b41"}} >Premium Plus Yearly</div>
                        <div style={{padding:"5px",fontWeight:"bolder",fontSize:"22px",color:"#032b41"}} >$99.99/year</div>
                        <div style={{padding:"5px",fontSize:"13px",color:"grey"}} >7-day free trial included</div>
                    </div>
                </div>
            </div> 
            <div className="center" style={{flexDirection:"column"}} onClick={()=>{setOn2(true);setOn1(),setBorder2("4px solid #20ba68"),setBorder1("4px solid gray")}}>
                <div className="center" style={{justifyContent:'start',border:border2,width:"650px",height:"140px",margin:"20px",backgroundColor:"#f1f6f4",borderRadius:"8px"}}>
                    <button onClick={()=>{setOn2(true);setOn1(),setBorder2("4px solid #20ba68"),setBorder1("4px solid gray")}} className="center" style={{width:"25px",height:"25px",borderRadius:"50%",border:"2px solid black",margin:"20px",position:"relative",bottom:"30px"}}>
                        {on2 && <span style={{backgroundColor:"black",width:"6px",height:"6px",borderRadius:"50px"}} ></span>}
                    </button>
                    <div>
                        <div style={{padding:"5px",fontWeight:"bolder",fontSize:"20px",color:"#032b41"}} >Premium Monthly</div>
                        <div style={{padding:"5px",fontWeight:"bolder",fontSize:"22px",color:"#032b41"}} >$9.99/month</div>
                        <div style={{padding:"5px",fontSize:"13px",color:"grey"}} >No trial included</div>
                    </div>
                </div>
            </div> 
            <div className="center" style={{flexDirection:"column"}}>
                {on1 ? <button className=" center btn" onClick={()=>getCheckoutUrl('price_1QRLMTIZAnJ0s9ybjGtOekL4','premium-plus')} style={{width:"300px"}} >Start your free 7-day trial</button>:
                <button className="center btn" onClick={()=>getCheckoutUrl('price_1QRLFfIZAnJ0s9ybHSTVWrtw','premium')} style={{width:"300px"}} >Start your first month </button>}
                {on1 ? <div style={{padding:"5px",fontSize:"13px",color:"grey",margin:"5px"}}>Cancel your trial at any time before it ends, and you won’t be charged.</div>:
                <div style={{padding:"5px",fontSize:"13px",color:"grey",margin:"5px"}}>30-day money back guarantee, no questions asked.</div>}
            </div>
            <div className="center" style={{flexDirection:"column"}}>
                <div className="center" style={{alignItems:"space-between",flexDirection:"column",marginBottom:"40px",width:"80%"}}>
                    <div style={{color:"black",display:"flex",justifyContent:"space-between",width:'100%',margin:"50px",fontSize:"25px"}} >How does the free 7-day trial work? <button style={{scale:"2",position:"relative",right:"10px",marginLeft:"20px"}}>{cover1 == 'coverDown' ? <FaChevronUp onClick={()=>setCover1('cover coverUp')}/>:<FaChevronDown onClick={()=>setCover1('coverDown')} />}</button></div>
                    <div style={{display:'flex',marginBottom:"20px"}}>
                        Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                    </div>
                </div>

                <div className={cover1} style={{backgroundColor:"white",borderTop:"1px solid grey",zIndex:"10",width:"80%"}}>
                <div className="center" style={{alignItems:"space-between",flexDirection:"column",marginBottom:"40px"}}>
                    <div style={{color:"black",display:"flex",justifyContent:"space-between",width:'100%',margin:"50px",fontSize:"25px"}} >Can I switch subscriptions from monthly to yearly, or yearly to monthly? <button style={{scale:"2",position:"relative",right:"10px",marginLeft:"20px"}}>{cover2 == 'coverDown' ? <FaChevronUp onClick={()=>setCover2('cover coverUp')}/>:<FaChevronDown onClick={()=>setCover2('coverDown')} />}</button></div>
                    <div style={{display:'flex',marginBottom:"20px"}}>
                        While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                    </div>
                </div>
                <div className={cover2} style={{backgroundColor:"white",borderTop:"1px solid grey",zIndex:"10"}}>
                <div className="center" style={{alignItems:"space-between",flexDirection:"column",marginBottom:"40px"}}>
                    <div style={{color:"black",display:"flex",justifyContent:"space-between",width:'100%',margin:"50px",fontSize:"25px"}} >What's included in the Premium plan? <button style={{scale:"2",position:"relative",right:"10px",marginLeft:"20px"}}>{cover3 == 'coverDown' ? <FaChevronUp onClick={()=>setCover3('cover coverUp')}/>:<FaChevronDown onClick={()=>setCover3('coverDown')} />}</button></div>
                    <div style={{display:'flex',marginBottom:"20px"}}>
                        Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                    </div>
                </div>
                <div className={cover3} style={{backgroundColor:"white",borderTop:"1px solid grey",zIndex:"10"}}>
                <div className="center" style={{alignItems:"space-between",flexDirection:"column",marginBottom:"40px"}}>
                    <div style={{color:"black",display:"flex",justifyContent:"space-between",width:'100%',margin:"50px",fontSize:"25px"}} >Can I cancel during my trial or subscription? <button style={{scale:"2",position:"relative",right:"10px",marginLeft:"20px"}}>{cover4 == 'coverDown' ? <FaChevronUp onClick={()=>setCover4('cover coverUp')}/>:<FaChevronDown onClick={()=>setCover4('coverDown')} />}</button></div>
                    <div style={{display:'flex',marginBottom:"20px"}}>
                        You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
                    </div>
                </div>
                <div className={cover4} style={{backgroundColor:"white",borderTop:"1px solid grey",zIndex:"10",height:"100px"}}></div>
                </div>
                </div>
                </div>
            
            </div>
        </div>
      )
}