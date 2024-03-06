import { FiArrowLeftCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: 0 },
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};
const style = { color: "#fff", fontSize: "1.5rem", cursor: "pointer" };

// eslint-disable-next-line react/prop-types
const Header = ({ title }) => {
  const { currentUser, logout } = useAuth();

  return (
    <motion.div
      className="flex items-center mb-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="flex items-center justify-center gap-10 py-2 mr-6 bg-black">
        <Link to={"/dashboard"}>
          <FiArrowLeftCircle style={{ ...style, marginLeft: "1rem" }} />
        </Link>
        <button onClick={logout}>
          <IoLogOutOutline style={{ ...style, marginRight: "1rem" }} />
        </button>
      </div>
      <div className="text-xl font-semibold text-white">{title}</div>
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-white">{currentUser?.displayName ?? "名前"}</span>
        <FaUserCircle style={{ ...style }} />
      </div>
    </motion.div>
  );
};

export default Header;
