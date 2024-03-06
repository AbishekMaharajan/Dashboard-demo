import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { VRARRI } from "../../components";
import { useAuth } from "../../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { ease: "easeIn" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  // exit: {
  //   opacity: 0,
  //   y: -20,
  //   transition: { ease: "easeIn" },
  // },
};

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <motion.div
      className="flex items-center justify-center w-full h-full"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <VRARRI />
      <motion.div
        className="flex flex-col items-center justify-center w-3/5 bg-[#f5f5f7] rounded-lg shadow-2xl h-3/4"
        variants={itemVariants}
      >
        <h1 className="text-4xl font-extrabold mb-14">
          {t("dashboard.title")}
        </h1>
        <div className="flex flex-col w-full gap-2">
          <Link to="/projects">
            <motion.div
              className="bg-[#4D62BC] p-4 text-white text-center w-3/5 mx-auto text-2xl hover:bg-[#3e50a4] cursor-pointer"
              whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
            >
              {t("dashboard.projects")}
            </motion.div>
          </Link>
          <Link to="/scoreboard">
            <motion.div
              className="bg-[#4D62BC] p-4 text-white text-center w-3/5 mx-auto text-2xl hover:bg-[#3e50a4] cursor-pointer"
              whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
            >
              {t("dashboard.scoreboard")}
            </motion.div>
          </Link>
          <Link to="/settings">
            <motion.div
              whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
              className="bg-[#4D62BC] p-4 text-white text-center w-3/5 mx-auto text-2xl hover:bg-[#3e50a4] cursor-pointer"
            >
              {t("dashboard.settings")}
            </motion.div>
          </Link>
        </div>
      </motion.div>
      <button
        className="absolute w-20 px-4 py-1 text-center text-black bg-[#f5f5f7] rounded-lg shadow-2xl bottom-10 left-10 hover:bg-gray-200"
        onClick={logout}
      >
        {t("back")}
      </button>
    </motion.div>
  );
};

export default AdminDashboard;
