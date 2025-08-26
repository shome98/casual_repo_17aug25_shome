import { motion } from "motion/react"

function App() {
  return (
    <>
      <h1>Hi</h1>
      <motion.div
        initial={{
          x:20
        }}
        animate={{
          x: 500,
          rotate:360
        }}
        transition={{
          duration: 3,
          delay: 1,
          repeat:5
        }}
        className="box"></motion.div>
      <motion.div
        className="circle"
      ></motion.div>
    </>
  )
}

export default App
