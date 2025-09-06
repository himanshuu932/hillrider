import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the loader after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-white flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="/lo.jpg"
            alt="Hill Riders Logo"
            className="w-40 h-40 object-contain"
            animate={{
              scale: [1, 1.2, 1], // Zoom in and out
            }}
            transition={{
              duration: 2, // Total duration of one loop
              repeat: Infinity, // Repeat indefinitely
              repeatType: "loop", // Loop the animation
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
