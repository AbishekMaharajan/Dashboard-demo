import moment from "moment";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Header from "../scoreboard/Header";
import { get, set } from "firebase/database";
import { getProjectsList } from "../../service";
import UserImage from "../../components/UserImage";
import { Link, useNavigate } from "react-router-dom";
import { liveListRef, simulationListRef } from "../../firebase";
import ConfirmationPopUp from "./createProjects/ConfirmationPopUp";
import { useState } from "react";

const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

const Records = () => {
  return (
    <>
      <Header title="ユーザー名" />
      <Table />
    </>
  );
};

const Table = () => (
  <>
    <TableHead />
    <TableContent />
  </>
);

const TableHead = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="flex mb-6 text-sm font-light "
    >
      <div className="w-48">
        <button
          className="d-block text-white bg-black  h-full w-[90%]"
          onClick={() => navigate("create")}
        >
          ファイルの作成
        </button>
      </div>
      <div className="w-[40%] p-2 text-base bg-white ps-4">名前</div>
      <div className="w-[30%] p-2 text-base bg-white pe-4">変更日</div>
      <div className="w-[15%] text-base py-2 bg-white pe-4">JP/EN</div>
      <div className="w-[15%] text-base py-2 bg-white pe-4">アクション</div>
    </motion.div>
  );
};

const TableContent = () => {
  const { data: projectsList, refetch } = useQuery(
    "projectsList",
    getProjectsList,
    {
      enabled: true,
    }
  );

  const navigate = useNavigate();
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = useMemo(() => {
    if (projectsList) {
      return projectsList
        ?.reduce((acc, item) => [item].concat(acc), [])
        ?.map((el) => {
          const res = el?.split("_");
          const formateDate = moment(res[1]).format("DD.MM.YYYY");

          const formateTime = moment(res[2], "HH:mm:ss UTC")
            .add(9, "hours")
            .format("HH:mm");

          return {
            title: res[0],
            date: `${formateTime + " " + "JPT"} / ${formateDate}`,
            language: res[3],
          };
        });
    }
    return [];
  }, [projectsList]);

  const openConfirmationPopUp = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItem(item);
    setModelIsOpen(true);
  };

  const handleDuplicateClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/projects/create", { state: { ...item, isDuplicate: true } });
  };

  const handleDelete = () => {
    if (!selectedItem) return toast.error("");
    const getSimulationListPromise = get(simulationListRef).then((snapshot) => {
      const dbData = snapshot.val() || {};
      delete dbData[selectedItem.title];
      return set(simulationListRef, dbData);
    });

    const getLiveListPromise = get(liveListRef).then((snapshot) => {
      const currentList = snapshot.val() || [];

      const result = currentList?.filter(
        (el) => el.split("_")[0] !== selectedItem.title
      );

      return set(liveListRef, result);
    });

    Promise.all([getSimulationListPromise, getLiveListPromise])
      .then(() => {
        setModelIsOpen(false);
        toast.success("セーブに成功!");
        refetch();
        navigate("/projects");
      })
      .catch((error) => {
        toast.error(JSON.stringify(error));
      });
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        className="p-5 overflow-auto bg-[#f5f5f7] rounded-lg"
        style={{ height: "calc(100vh - 160px)" }}
      >
        {data?.map((el, i) => (
          <Link
            to="/projects/update"
            state={el}
            key={i}
            className="bg-[#BFBFBF] p-3 flex items-center mb-5 last:mb-0 cursor-pointer hover:bg-[#999797] transition"
          >
            <div className="w-48">
              <UserImage />
            </div>
            <div className="w-[40%]">
              <UserName
                name={el.title}
                projectsList={projectsList}
                refetch={refetch}
              />
            </div>
            <div className="w-[30%]">{el.date}</div>
            <div className="w-[15%]">
              {el.language === "jap"
                ? "JP"
                : el.language === "eng"
                ? "EN"
                : null}
            </div>
            <div className="w-[15%]">
              <button
                className="p-1 px-2 text-xs text-white bg-black me-2"
                onClick={(e) => openConfirmationPopUp(e, el)}
              >
                消去
              </button>
              <button
                className="p-1 px-2 text-xs text-white bg-black "
                onClick={(e) => handleDuplicateClick(e, el)}
              >
                複製
              </button>
            </div>
          </Link>
        ))}
      </motion.div>
      <ConfirmationPopUp
        modalIsOpen={modalIsOpen}
        setModelIsOpen={setModelIsOpen}
        deleteProject={handleDelete}
      />
    </>
  );
};
export default Records;

// eslint-disable-next-line react/prop-types
const UserName = ({ name, projectsList, refetch }) => {
  const [userName, setUserName] = useState(name);
  const [editSelected, setEditSelected] = useState(false);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  const handleChange = (e) => setUserName(e.target.value);
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditSelected(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedProjectList = [...projectsList];
    let idx = updatedProjectList.findIndex((el) => el.split("_")[0] === name);

    if (idx) {
      let item = updatedProjectList[idx].split("_");
      item[0] = userName;
      item = item.join("_");
      updatedProjectList[idx] = item;
    }

    set(liveListRef, updatedProjectList)
      .then(() => {
        get(simulationListRef)
          .then((snapshot) => {
            const dbData = snapshot.val() || {};
            dbData[userName.trim()] = dbData[name];
            dbData[name] && delete dbData[name];
            return set(simulationListRef, dbData);
          })
          .then(() => {
            toast.success("Updated Successfully!");
            refetch();
            setEditSelected(false);
          })
          .catch(() => {
            toast.error("Something went wrong !");
          });
      })
      .catch(() => {
        toast.error("Something went wrong !");
      });
  };
  return (
    <div className="flex items-center flex-1 gap-2 p-2 ">
      <div className="flex-1">
        {editSelected ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => handleChange(e)}
            autoFocus
            className="w-full bg-transparent focus:outline-none"
          />
        ) : (
          userName
        )}
      </div>

      <div className="flex items-center me-10">
        {editSelected ? (
          <button
            onClick={handleSave}
            className="p-1 px-2 text-xs text-white bg-black"
          >
            保存
          </button>
        ) : (
          <div className="w-6 h-6 cursor-pointer" onClick={handleEdit}>
            <img
              src="/edit.png"
              alt="edit"
              className=" block h-[100%] w-[100%]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
