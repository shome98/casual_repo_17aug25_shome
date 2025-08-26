import { motion } from "motion/react"

function App() {
  return (
    <>
      <h1>Hi</h1>
      <motion.div
        drag
        dragConstraints={{ left: 0, top: 0, right: 500, bottom: 500 }}
        className="box"></motion.div>
    </>
  )
}

export default App
