import Table from "./Table";
import { useQuery } from "react-query";
import Header from "../scoreboard/Header";
import { useEffect, useState } from "react";
import { getLicenseCount, getStaffList } from "../../service";

const Settings = () => {
  const { data: count } = useQuery("licenseCount", getLicenseCount);
  const { data: staffList, refetch } = useQuery("staffList", getStaffList);
  // const staffList = Object.values(staffData);
  // console.log("staffList: ", staffList);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (count && staffList) {
      const staffArray = Object.values(staffList);
      const userCount = count > staffArray?.length ? count : staffArray?.length;

      const result = [...Array(userCount).keys()]?.map((num, i) => ({
        id: num + 1,
        name: staffArray[i] ?? (num + 1).toString().padStart(3, "0"),
      }));

      setUserData(result);
    }
  }, [count, staffList]);

  return (
    <div className="w-full h-full p-5">
      <Header title="設定" />
      <Table data={userData} staffList={staffList} refetch={refetch} />
    </div>
  );
};

export default Settings;
