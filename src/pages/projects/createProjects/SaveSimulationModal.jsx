/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useProjects } from "../../../context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { set, get } from "firebase/database";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { liveListRef, simulationListRef } from "../../../firebase";

import { useQueryClient } from "react-query";

const SaveSimulationModal = ({ projectTitle = "", language = "" }) => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const [simulationTitle, setSimulationTitle] = useState(projectTitle);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { modalIsOpen, setModalIsOpen, stepData, setStepData } = useProjects();

  const closeModal = () => setModalIsOpen(false);
  const onLanguageChange = (e) => setSelectedLanguage(e.target.value);

  const handleSaveSimulation = () => {
    if (!stepData.length) return toast.error("データ無効なステップデータ");
    if (!simulationTitle) return toast.error("データが無効です");
    const date = moment().format("YYYY-MM-DD");
    const time = moment().utc().format("H:mm:ss [UTC]");

    const simulation = `${simulationTitle}_${date}_${time}_${selectedLanguage}`;

    const getSimulationListPromise = get(simulationListRef).then((snapshot) => {
      const dbData = snapshot.val() || {};

      const updatedStepData = stepData.map((el) => ({
        customerContent: el?.customerContent,
        staffContent: el?.staffContent,
        stepHeader: "",
      }));

      dbData[simulationTitle] = {
        createdDate: date,
        createdTime: time,
        stepData: updatedStepData,
      };

      return set(simulationListRef, dbData);
    });

    const getLiveListPromise = get(liveListRef).then((snapshot) => {
      const currentList = snapshot.val() || [];

      if (!projectTitle && !language)
        return set(liveListRef, [...currentList, simulation]);

      const result = currentList.map((el) => {
        const title = el.split("_");
        if (title[0] === projectTitle) el = simulation;
        return el;
      });

      return set(liveListRef, result);
    });

    Promise.all([getSimulationListPromise, getLiveListPromise])
      .then(() => {
        toast.success("セーブに成功!");
        closeModal();
        setStepData([]);
        queryClient.invalidateQueries("projectsList");
        navigation("/projects");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    setSimulationTitle(projectTitle);
    setSelectedLanguage(language ? language : "jap");
  }, [language, projectTitle]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      className="relative flex flex-col items-center justify-end p-10 SaveSimulationModal w-42"
      overlayClassName="Overlay"
    >
      <button
        onClick={closeModal}
        className="absolute cursor-pointer right-3 top-3"
      >
        <AiOutlineCloseCircle fontSize={"1.5rem"} color="#333" />
      </button>
      <div className="absolute -left-10 -right-10 top-14">
        <input
          value={simulationTitle}
          onChange={(e) => {
            setSimulationTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.which === 189 && e.shiftKey === true) e.preventDefault();
          }}
          autoFocus
          type="text"
          className="w-full h-full p-5 px-10 bg-[#3a457b] text-white focus:outline-none "
          disabled={projectTitle !== ""}
          placeholder="シミュレーション名を入力してください..."
        />
      </div>
      <div className="flex gap-10 mb-10">
        <div className="flex gap-2">
          <input
            type="radio"
            id="jap"
            name="language"
            value="jap"
            className="w-5 h-5 radio text-sky-600 checked:text-sky-600 checked:bg-red-400"
            checked={selectedLanguage === "jap"}
            onChange={onLanguageChange}
          />
          <label htmlFor="jap">日本語</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="eng"
            name="language"
            value="eng"
            className="w-5 h-5 radio checked:text-sky-600 checked:bg-red-400"
            checked={selectedLanguage === "eng"}
            onChange={onLanguageChange}
          />
          <label htmlFor="eng">English</label>
        </div>
      </div>

      <button
        className="p-4 text-xs text-center text-white bg-black rounded-full"
        onClick={handleSaveSimulation}
      >
        シミュレーション名を入力
      </button>
    </Modal>
  );
};

export default SaveSimulationModal;
