import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

function App() {
  useGSAP(() => {
   gsap.to('.box',{x:500,duration:3,delay:1})
  });
  return (
    <>
      <h1>hi </h1>
      <div className="box"></div>
    </>
  )
}

export default App;
