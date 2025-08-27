import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useRef } from "react";

function App() {
  const gsapref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from('.box-gradient', {
      y: 300,
      opacity: 0,
      rotate: 360,
      duration: 1,
      delay:1
   })
  });
  return (
    <>
      <main>
        <div className="container">
          <div className="box-gradient"></div>
          <div className="circle-gradient"></div>
        </div>
        <div className="container">
          <div className="box-gradient"></div>
          <div className="circle-gradient"></div>
        </div>
      </main>
    </>
  )
}

export default App;
