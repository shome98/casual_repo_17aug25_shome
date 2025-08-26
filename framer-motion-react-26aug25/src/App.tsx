import { motion } from "motion/react"

function App() {
  return (
    <>
      <h1>Hi</h1>
      <motion.div
        animate={{
          x: 100,
          rotate:36
        }}
        className="box"></motion.div>
      <motion.div
        animate={{
          y: 70,
          scale:0.5
        }}
        className="circle"
      ></motion.div>
    </>
  )
}

export default App
