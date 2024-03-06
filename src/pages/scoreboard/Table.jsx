/* eslint-disable react/prop-types */
import moment from "moment";
import { useState } from "react";
import { motion } from "framer-motion";
import { get, set } from "firebase/database";
import VideoPlayerModal from "./VideoPlayerModal";
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import ConfirmationPopUp from "../projects/createProjects/ConfirmationPopUp";
import { scoreListRef } from "../../firebase";
import { FaPlayCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useQueryClient } from "react-query";

const rowVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Table = ({ data, filters, scoreBoardList }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideUrl] = useState(null);

  const openModal = (url) => {
    setVideUrl(url ?? "");
    setModalIsOpen(true);
  };

  return (
    <div className="w-full">
      <TableHead />
      <TableContent
        openModal={openModal}
        data={data}
        filters={filters}
        scoreBoardList={scoreBoardList}
      />
      <VideoPlayerModal
        videoUrl={videoUrl}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

const TableHead = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={rowVariants}
    className="mb-2 bg-white"
  >
    <div className="flex p-2 text-sm font-normal text-gray-800">
      <div className="flex-1 ps-4">名前</div>
      <div className="flex-1">変更日</div>
      <div className="flex-1">サイズ</div>
      <div className="flex-1">結果</div>
      <div className="flex-1">トータルスコア</div>
      <div className="flex-1">ボリュームスコア</div>
      <div className="flex-1">スピードスコア</div>
      <div className="flex-1">ヘッドトラッキング・スコア</div>
      <div className="flex-1">ボイススコア</div>
      <div className="flex-1 pr-4">レコーディング</div>
    </div>
  </motion.div>
);

const TableContent = ({ openModal, data, filters, scoreBoardList }) => {
  const queryClient = useQueryClient();

  const filteredData = filterData(data, filters);
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openConfirmationPopUp = (item) => {
    setSelectedItem(item);
    setModelIsOpen(true);
  };

  const deleteSimulation = () => {
    const index = [...scoreBoardList]
      .sort((a, b) => b - a)
      .findIndex((el) => {
        const data = el.split("_");
        return data[data.length - 1] === selectedItem.video;
      });
    if (index > -1) {
      get(scoreListRef)
        .then((snapshot) => {
          const dbData = snapshot.val() || [];

          const filteredData = dbData.filter((_el, i) => i !== index);

          setModelIsOpen(false);
          return set(scoreListRef, filteredData);
        })
        .then(() => {
          queryClient.invalidateQueries("scoreBoardList");
        })
        .catch((err) => err && alert("Something went wrong"));
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={rowVariants}
      className=" overflow-y-auto max-h-[80vh] pb-16"
    >
      {filteredData?.map((el, i) => (
        <motion.div
          key={i}
          initial="hidden"
          animate="visible"
          variants={rowVariants}
          className="bg-[#BFBFBF] mb-2 flex items-center p-2 py-3 font-light text-sm "
        >
          <div className="flex-1 ps-4">{el?.name}</div>
          <div className="flex-1">{el?.date}</div>
          <div className="flex-1">{el?.module}</div>
          <div className="flex-1">
            {el?.result == 1 ? (
              <IoMdCheckmarkCircle
                style={{ color: "#43a047", fontSize: "1.8rem" }}
              />
            ) : (
              <IoIosCloseCircle
                style={{ color: "#ff0000", fontSize: "1.8rem" }}
              />
            )}
          </div>

          <div className="flex-1">{el?.totalScore}</div>
          <div className="flex-1">{el?.volumeScore}</div>
          <div className="flex-1">{el?.speedScore}</div>
          <div className="flex-1">{el?.headTrackingScore}</div>
          <div className="flex-1">{el?.voiceScore}</div>
          <div className="flex flex-1 gap-1 pr-4">
            <button
              className="flex items-center justify-center gap-1 p-1 px-2 text-white bg-black text-nowrap"
              onClick={() => openModal(el?.video)}
            >
              <FaPlayCircle />{" "}
              <span className="text-[8px] font-semibold"> 表示 </span>
            </button>
            <button
              className="flex items-center justify-center gap-1 p-1 px-2 text-white bg-black text-nowrap"
              onClick={() => openConfirmationPopUp(el)}
            >
              <MdDelete />{" "}
              <span className="text-[8px] font-semibold">取り除く</span>
            </button>
          </div>
        </motion.div>
      ))}
      <ConfirmationPopUp
        modalIsOpen={modalIsOpen}
        setModelIsOpen={setModelIsOpen}
        deleteProject={deleteSimulation}
      />
    </motion.div>
  );
};

function filterData(data, filters) {
  const { name, module, result, date } = filters;

  let filteredData = data?.filter(
    (el) =>
      el?.name?.includes(name) &&
      el?.module?.includes(module) &&
      el?.result?.includes(result)
  );

  if (date === "") {
    return filteredData;
  }

  const currentDate = moment();

  if (date === "this week") {
    const startDate = currentDate?.startOf("week");
    filteredData = filteredData?.filter((item) =>
      moment(item.date)?.isSameOrAfter(startDate, "day")
    );
  }

  if (date === "last week") {
    const startDate = currentDate?.clone().startOf("week").subtract(1, "week");
    const endDate = currentDate?.clone().startOf("week").subtract(1, "day");
    filteredData = filteredData?.filter((item) =>
      moment(item.date)?.isBetween(startDate, endDate, "day")
    );
  }

  if (date === "this month") {
    const startDate = currentDate?.startOf("month");
    filteredData = filteredData?.filter((item) =>
      moment(item.date)?.isSameOrAfter(startDate, "day")
    );
  }

  if (date === "last month") {
    const startDate = currentDate
      ?.clone()
      .startOf("month")
      .subtract(1, "month");
    const endDate = currentDate?.clone().startOf("month").subtract(1, "day");
    filteredData = filteredData?.filter((item) =>
      moment(item.date)?.isBetween(startDate, endDate, "day")
    );
  }

  return filteredData;
}

export default Table;
