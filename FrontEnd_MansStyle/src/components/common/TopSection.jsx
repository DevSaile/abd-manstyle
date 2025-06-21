import React from 'react'
import { motion } from 'framer-motion'

const TopSection = ({children}) => {
  return (
    <motion.div className='flex justify-evenly bg-[#475DCD] align-middle pt-7 md:visible '>
        {children}
        
    </motion.div>
    
  )
}

export default TopSection