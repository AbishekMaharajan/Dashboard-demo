/* eslint-disable react/prop-types */

import { useState } from "react";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import UserImage from "../../components/UserImage";

const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

const staffListRef = ref(db, "users/ysHotel/staffList");

const Table = ({ data, staffList, refetch }) => (
  <>
    <TableHead />
    <TableContent data={data} staffList={staffList} refetch={refetch} />
  </>
);

const TableHead = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={variants}
    className="flex mb-6 text-sm font-light "
  >
    <div className="flex-1 p-2"></div>
    <div className="flex-1 p-2 text-base bg-[#f5f5f7] ps-4">ID(編集不可)</div>
    <div className="flex-1 p-2 text-base bg-[#f5f5f7] pe-4">名前(編集可)</div>
  </motion.div>
);

const TableContent = ({ data, staffList, refetch }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={variants}
    className="p-5 overflow-auto bg-[#f5f5f7] rounded-lg"
    style={{ height: "calc(100vh - 160px)" }}
  >
    {data.map((user, i) => (
      <div
        className="bg-[#BFBFBF] p-3 flex items-center mb-5 last:mb-0"
        key={user.id}
      >
        <UserImage />
        <div className="flex-1 p-2">{user.id}</div>
        <UserName
          name={user.name}
          index={i}
          staffList={staffList}
          refetch={refetch}
        />
      </div>
    ))}
  </motion.div>
);

const UserName = ({ name, index, staffList, refetch }) => {
  const [userName, setUserName] = useState(name);
  const [editSelected, setEditSelected] = useState(false);

  const handleChange = (e) => setUserName(e.target.value);
  const handleEdit = () => setEditSelected(true);

  const handleSave = () => {
    const updatedStaffList = { ...staffList };
    updatedStaffList[index] = userName;

    set(staffListRef, updatedStaffList)
      .then(() => {
        toast.success("User Updated !");
        refetch();
        setEditSelected(false);
      })
      .catch((error) => {
        console.log("error: ", error);
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

      <div className="flex items-center flex-1 gap-4">
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

export default Table;
