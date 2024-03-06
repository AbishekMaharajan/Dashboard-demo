const LICENSE_COUNT_URL =
  "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/licenseCount.json";
const STAFF_LIST_URL =
  "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/staffList.json";

export const getLicenseCount = async () => {
  const res = await fetch(LICENSE_COUNT_URL);
  return res?.json();
};

export const getStaffList = async () => {
  const res = await fetch(STAFF_LIST_URL);
  return res?.json();
};
