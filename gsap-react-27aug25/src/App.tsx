import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const animate = contextSafe(() => {
    gsap.to(boxRef.current, {
      x: 200,
      duration: 2,
      rotate: 720,
    });
  });

  return (
    <>
      <button onClick={animate} className="button-green">
        Safely animate
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
