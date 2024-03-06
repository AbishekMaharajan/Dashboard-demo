import { motion } from "framer-motion";

const VRARRI = () => (
  <motion.h1
    className="absolute pb-10 text-white left-10 top-10"
    initial={{ opacity: 0, left: 0 }}
    animate={{ opacity: 1, left: "2.5rem" }}
    exit={{ opacity: 0, left: 0 }}
    transition={{ duration: 0.4 }}
  >
    VRARRI
  </motion.h1>
);

// eslint-disable-next-line react-refresh/only-export-components
export default VRARRI;
