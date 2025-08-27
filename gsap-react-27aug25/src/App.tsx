import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useRef } from "react";

function App() {
  const gsapref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
   gsap.to(gsapref.current,{x:500,duration:3,delay:1,rotate:720})
  });
  return (
    <>
      <h1>hi </h1>
      <div ref={ gsapref} className="box"></div>
    </>
  )
}

export default App;
