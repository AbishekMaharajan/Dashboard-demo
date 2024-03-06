import { AiFillCloseCircle } from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "../../../context";
import { AnimatePresence, motion } from "framer-motion";

const ProjectFormPage = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { stepData, setStepData } = useProjects();

  const isUpdateScreen = pathname.split("/")[2] === "update";
  const pathName = isUpdateScreen ? "/projects/update" : "/projects/create";

  const handleStaffContentChange = (e) => {
    if (state) {
      const data = [...stepData];
      data[state.id - 1].staffContent = e.target.value;
      setStepData(data);
    }
  };

  const handleCustomerContentChange = (e) => {
    if (state) {
      const data = [...stepData];
      data[state.id - 1].customerContent = e.target.value;
      setStepData(data);
    }
  };

  const handleDelete = () => {
    if (state) {
      let data = [...stepData]
        .filter((el) => el.id !== state.id)
        .map((el, i) => ({
          ...el,
          id: i + 1,
          step: `ステップ ${String(i + 1)?.padStart(2, "0")}`,
        }));
      setStepData(data);
      navigate(pathName, { state: isUpdateScreen && state, replace: true });
    }
  };

  return (
    <div className="w-full h-full relative p-12 pb-6">
      <div className="flex gap-4 items-center absolute right-2 top-2">
        <button className="cursor-pointer" onClick={handleDelete}>
          <BsTrash3Fill color="#fc0005" fontSize={"1.5rem"} />
        </button>
        <Link
          to={pathName}
          state={isUpdateScreen && state}
          className=" cursor-pointer "
          replace
        >
          <AiFillCloseCircle color="#333" fontSize={"2rem"} />
        </Link>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={state?.step ?? ""}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className=" flex flex-col gap-10 h-full"
        >
          <div className="font-bold">{state?.step}</div>
          <div className="flex-1  rounded-lg overflow-hidden">
            <textarea
              className="w-full h-full bg-[#b9b9b9] p-5 focus:outline-none placeholder:text-gray-600"
              placeholder="店員側のマニュアルを入力"
              value={state?.staffContent ?? ""}
              onChange={handleStaffContentChange}
              maxLength={250}
            />
          </div>
          <div className="flex-1 rounded-lg overflow-hidden">
            <textarea
              className="w-full h-full bg-[#b9b9b9] p-5 focus:outline-none placeholder:text-gray-600"
              placeholder="お客様側のマニュアルを入力"
              value={state?.customerContent ?? ""}
              onChange={handleCustomerContentChange}
              maxLength={250}
            />
          </div>
          {/* <Link
            to={pathName}
            state={isUpdateScreen && state}
            className="text-center"
            replace
          >
            <button className="text-center text-white bg-black p-2  rounded-full px-5">
              シミュレーション名を入力
            </button>
          </Link> */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectFormPage;
