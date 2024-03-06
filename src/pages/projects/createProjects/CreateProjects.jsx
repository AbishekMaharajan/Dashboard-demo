import { clsx } from "clsx";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { getIndividualProject } from "../../../service";
import SaveSimulationModal from "./SaveSimulationModal";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ProjectsProvider, useProjects } from "../../../context/ProjectContext";

const CreateProjects = () => {
  const { state } = useLocation();
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (state?.title && !state?.isDuplicate) setPath(state.title);
    if (state?.language && !state?.isDuplicate) setLanguage(state.language);
  }, [state?.isDuplicate, state?.language, state?.title]);
  return (
    <motion.div
      className="relative w-full h-full p-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
    >
      <ProjectsProvider>
        <Link
          to={"/projects"}
          className="absolute top-0 right-0 cursor-pointer "
          replace
        >
          <AiFillCloseCircle color="#fff" fontSize={"2rem"} />
        </Link>

        <div className="flex w-full h-full">
          <SideBar />
          <SaveSimulationModal projectTitle={path} language={language} />
          <div className="flex items-center justify-center flex-1 p-10 pl-20">
            <div className="w-full h-full bg-[#f5f5f7] rounded-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </ProjectsProvider>
    </motion.div>
  );
};

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const isUpdateScreen = pathname.split("/")[2] === "update";
  const { stepData, setStepData, setModalIsOpen } = useProjects();

  const { data } = useQuery(
    ["individualProject", state?.title],
    () => getIndividualProject(state?.title),
    { enabled: state?.title ? true : false }
  );

  const handleAddSteps = () => {
    setStepData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        step: `ステップ ${String(prev.length + 1)?.padStart(2, "0")}`,
        staffContent: "",
        customerContent: "",
      },
    ]);
  };

  useEffect(() => {
    if (data) {
      const updatedData = data?.stepData?.map((el, i) => ({
        id: i + 1,
        step: `ステップ ${String(i + 1)?.padStart(2, "0")}`,
        staffContent: el?.staffContent,
        customerContent: el?.customerContent,
      }));

      setStepData(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="w-48 ">
      <div className="flex flex-col w-full h-full gap-4">
        <button
          className="w-full p-4 text-xs text-center text-white bg-black rounded-full disabled:bg-black/75 disabled:text-white/75"
          onClick={() => setModalIsOpen(true)}
          disabled={!stepData?.length}
        >
          シミュレーションを保存
        </button>
        <button
          className="w-full p-4 text-xs text-center text-white bg-black rounded-full"
          onClick={handleAddSteps}
        >
          ステップの追加
        </button>
        <div className="flex flex-col items-center flex-1 h-full gap-2 p-2 py-4 overflow-auto bg-black rounded-xl">
          {stepData?.map((el, i) => (
            <button
              key={i}
              className={clsx(
                "text-xs w-full p-2 text-center rounded-full transition",
                state?.step === el?.step
                  ? "text-white bg-sky-700 hover:bg-sky-800"
                  : "text-black bg-white hover:bg-white/90"
              )}
              onClick={() =>
                navigate(
                  `/projects/${isUpdateScreen ? "update" : "create"}/${
                    el?.step
                  }`,
                  { state: el, replace: true }
                )
              }
            >
              {el?.step}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateProjects;
