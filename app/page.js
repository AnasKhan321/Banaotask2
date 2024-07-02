"use client"
import Image from "next/image";
import {useEffect ,useState} from "react"  ; 
import {HashLoader}  from "react-spinners" ; 
import { IoMdClose } from "react-icons/io";

export default function Home() {

  const [items , setitems]  = useState([])
  const [loading , setloading ]  = useState(false )
  const [trans , settrans]  = useState("translate-x-full ")
  const [currentuser  , setcurrentuser ]  = useState({})
  const [currentsrc , setcurrentsrc]  = useState("")
  const [wrong , setwrong]  = useState(false)

  const fetchData  = async ()=>{
    if(loading){
      return ; 
    }
    setloading(true)
    const response = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users") 
    
   if(response.status == 200){

    const data = await response.json()
    setitems(data)
   }else{

      setwrong(true)

   }
   setTimeout(() => {
    setloading(false)
   }, 1000);

    
  }

  const handleClick = (user)=>{
    setcurrentuser(user)
    settrans("translate-x-0")
    console.log(user)
    setcurrentsrc(user.avatar)
  }

  useEffect(()=>{
      fetchData()
  },[])

  return (
    <main className="overflow-x-hidden">

      {loading && <div className="flex justify-center items-center h-screen" > 


          <HashLoader/>



      </div> }


    {!loading && 
          <div> 
            
              {items.map((item  , index) =>{
                return(
                  <div key={index}  className="flex items-center p-4 border-b-2  cursor-pointer hover:shadow-lg"  
                  onClick={()=>{ handleClick(item) }} > 
                  
                  
                  <ImageWithFallback key={index} src={item.avatar} alt={`Avatar ${index}`} />    

                  <div className="ml-5" > 
                      <h2 className="font-bold md:text-xl text-base " >{item.profile.username}</h2>
                      <p>{item.jobTitle}</p>
                  </div> 
                  </div> 
                )
              })}  
            
          </div> }


          <div className={`h-screen xl:w-3/12  md:5/12  w-8/12  bg-white  ${trans} shadow-xl   z-10   fixed top-0 right-0   transition-all  `} > 
            
                  <div className="flex flex-col items-center justify-center mt-5 space-y-4"  > 
                  <ImageWithFallback  src={currentsrc} alt={`Avatar `} />    
                  <div className="flex flex-col items-center justify-center  space-y-1" >
                    
                    <div className="font-bold text-xl " >
                    {currentuser?.profile?.firstName} {currentuser?.profile?.lastName}

                      
                    </div> 
                    <div> 
                    
                    {currentuser?.profile?.username}
                    </div> 
                    <div >
                    {currentuser?.jobTitle}

                      
                    </div>

                    <div>
                    {currentuser?.profile?.email}

                      
                    </div> 

                    <div className="text-wrap w-4/5 text-center" > 
                        {currentuser?.Bio}  
                    </div> 
                     
                    </div> 

                    <div className="absolute top-0 right-2 cursor-pointer"  onClick={()=>{
                      settrans("translate-x-full")
                    }} > 
                      
                    <IoMdClose/>
                      </div> 

                

                  </div> 
            
            </div> 

            {wrong && <div  className="text-center " > 
            
                Something Went Wrong !
            
            </div> }
     
    </main>
  );
}



const ImageWithFallback = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    setImgSrc('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={100}
      height={100}
      quality={100}
      className="rounded-full"
      onError={handleError}
    />
  );
};
