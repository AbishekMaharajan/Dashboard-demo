import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { VRARRI, LanguageSelectDropdown } from "../../components";
import { motion } from "framer-motion";
const LanguageSelection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <VRARRI />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, transition: { delay: 0 } }}
        transition={{ duration: 0.5 }}
        className="bg-white w-3/5 h-[70%] rounded-lg shadow-lg flex flex-col justify-center p-[5%]"
      >
        <div className="mt-auto">
          <label className="block mb-5 text-3xl font-bold">
            {t("languageSelection")}
          </label>
          <LanguageSelectDropdown />
        </div>

        <Link
          className="bg-[#4d62bc] hover:bg-blue-700/75 px-5 py-2 rounded-full text-white mt-auto w-32 text-center ml-auto"
          to="auth"
        >
          {t("continue")}
        </Link>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;
