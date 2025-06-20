import React from 'react'
import { motion } from 'framer-motion'

const TopSection = ({children}) => {
  return (
    <motion.div className='flex justify-center bg-blue-700 align-middle pt-7 md:visible px-7'>
        {children}
        
    </motion.div>
    
  )
}

export default TopSection