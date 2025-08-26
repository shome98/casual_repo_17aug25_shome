import { motion } from "motion/react"

function App() {
  return (
    <>
      <h1>Hi</h1>
      <motion.div
        whileHover={{ backgroundColor: 'green' }}
        whileTap={{scale:0.5}}
        className="box"></motion.div>
      <motion.div
        className="circle"
      ></motion.div>
    </>
  )
}

export default App
