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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.png" alt="Hill Riders Logo" className="w-40 h-40 object-contain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
