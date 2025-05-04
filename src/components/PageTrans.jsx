import { motion } from "framer-motion";

export const PageTrans = ({ children }) => {
  return (
    <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.1, opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    
>
  {children}
</motion.div>

  );
};
