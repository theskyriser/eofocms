import { motion } from 'framer-motion'
import React from 'react'

const Backdrop = ({children}) => {
  return (
    <motion.div className='absolute top-0 left-0 h-full w-full bg-[#000000e1] flex items-center justify-center' initial={{opacity:0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        {children}
    </motion.div>
  )
}

export default Backdrop