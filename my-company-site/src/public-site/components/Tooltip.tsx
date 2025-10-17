import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || <span className="w-4 h-4 rounded-full bg-blue-600 cursor-pointer"></span>}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
