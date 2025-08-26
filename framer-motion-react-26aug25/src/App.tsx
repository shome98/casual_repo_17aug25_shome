import { motion } from "motion/react"

function App() {
  return (
    <>
      <h1>Hi</h1>
      <motion.div
        animate={{
          x: [0,500,500,0,0],
          y: [0, 0, 300, 300, 0],
          rotate:[0,360,0,-360,0]
        }}
        transition={{
          duration: 4,
          delay: 1,
          repeat:3
        }}
        className="box"></motion.div>
      <motion.div
        className="circle"
      ></motion.div>
    </>
  )
}

export default App
