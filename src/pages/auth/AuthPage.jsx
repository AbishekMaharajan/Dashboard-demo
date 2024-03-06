import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { VRARRI } from "../../components";
import Login from "./Login";

const AuthPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <VRARRI />
      <div className="flex flex-row items-center justify-center w-full h-full">
        <motion.h1
          className="w-1/2 text-5xl font-extrabold text-center text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: -20,
            transition: { ease: "easeIn", delay: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {t("auth.title")}
        </motion.h1>
        <div className="w-1/2">
          <motion.div
            className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { ease: "easeIn", delay: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            {/* <Outlet /> */}
            <Login />
          </motion.div>
        </div>
      </div>
      {/* <motion.div
        initial={{ opacity: 0, left: 0 }}
        animate={{ opacity: 1, left: "2.5rem" }}
        exit={{ opacity: 0, left: 0, transition: { ease: "easeIn", delay: 0 } }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to={to}
          className="absolute w-20 px-4 py-1 text-center text-black bg-white rounded-lg shadow-2xl bottom-10 left-10 hover:bg-gray-200"
        >
          {t("back")}
        </Link>
      </motion.div> */}
    </div>
  );
};

export default AuthPage;
