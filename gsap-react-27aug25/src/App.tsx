import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function App() {
  const [circle, SetCircle] = useState(0);
  const random = gsap.utils.random(-500, 500,10);
  const handleAnimate = () => {
    SetCircle(random);
  };
  const circleAnimate = () => {
    gsap.to('.circle-gradient', {
      x: circle,
      duration: 0.5
    })
  };
  useGSAP(circleAnimate, [circle]);
  
  return (
    <>
      <button onClick={handleAnimate} className="button-green">
        Animate
      </button>
      <main>
        <div className="circle-gradient"></div>
      </main>
    </>
  );
}

export default App;
