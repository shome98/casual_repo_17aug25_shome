import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

function App() {
  const [x, setX] = useState(0);
  const [rotate, setRotate] = useState(0);
  const random = gsap.utils.random(-500, 500, 10);
  const rotateRandom = gsap.utils.random(-360, 360, 30);
  const boxRef = useRef<HTMLDivElement>(null);
  const handleAnimate = () => {
    setX(random);
    setRotate(rotateRandom);
  };
  const xAnimate = () => {
    gsap.to(boxRef.current, {
      x: x,
      duration: 2,
      rotate: rotate
    });
  };
  useGSAP(xAnimate, [x]);
  
  return (
    <>
      <button onClick={handleAnimate} className="button-green">
        Animate
      </button>
      <main>
        <div ref={boxRef} className="box-gradient">
          <img
            src="https://www.shutterstock.com/image-photo/beautiful-golden-retriever-cute-puppy-600nw-2526542701.jpg"
            alt="dog-image"
          />
        </div>
      </main>
    </>
  );
}

export default App;
