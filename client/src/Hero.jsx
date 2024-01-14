import {useTypewriter , Cursor } from 'react-simple-typewriter'
import { Link } from "react-router-dom";
import {Button} from "@nextui-org/react"
function Hero() {
  const [text] = useTypewriter({
   words: ['Secure' , 'Transparent' , 'Better'],
   loop:{},
   typeSpeed:120,
   deleteSpeed:80,

  })
    return (
      <>
      <div className='hero__page'>
      <div className="grid">
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>
        <div className="grid__background"></div>

      </div>
       <div className='heading'>
         <h1 className='text-white font__size'>
          Make your Placement Journey 
          <div className='cursor'>
          <p className='safer'>
            {text}
          </p>
          <Cursor/>
          </div>
         </h1>
       </div>
       <div className='build__button'>
       <Link to = "resume">
       <Button color="secondary" size='lg' >
         Build
       </Button>
       </Link>
       </div>
      </div>
      </>
    )
  }
  
  export default Hero
  