import React from 'react'
import { motion } from 'framer-motion'

const TopSection = ({children}) => {
  return (
    <motion.div className='flex justify-around bg-[#475DCD] align-middle py-7 w-full px-8  md:visible gap-9'>
        {children}
        
    </motion.div>
    
  )
}

export default TopSection