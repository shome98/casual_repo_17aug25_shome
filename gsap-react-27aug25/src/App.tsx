import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useRef } from "react";

function App() {
  const boxref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
  //   gsap.from(boxref.current, {
  //     rotate: 360,
  //     duration: 1,
  //     delay:1
    //  })
    gsap.from('.box-gradient', {
      rotate: 3600,
      scale: 0,
      duration: 1,
      opacity: 0,
      delay:0.5
    })
  },{scope:'.container'});
  return (
    <>
      <main>
        <div className="container">
          <div ref={ boxref} className="box-gradient"></div>
          <div className="circle-gradient"></div>
        </div>
        <div className="">
          <div className="box-gradient"></div>
          <div className="circle-gradient"></div>
        </div>
      </main>
    </>
  )
}

export default App;
