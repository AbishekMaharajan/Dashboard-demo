// Production
// const PROJECTS_LIST_URL =
//   "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/dataList/liveList.json";
// const INDIVIDUAL_PROJECT =
//   "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/simulationlist/live/";

// Development
const PROJECTS_LIST_URL =
  "https://ys-hotel-dev-server-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/dataList/liveList.json";
const INDIVIDUAL_PROJECT =
  "https://ys-hotel-dev-server-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/simulationlist/live/";

export const getProjectsList = async () => {
  const res = await fetch(PROJECTS_LIST_URL);
  return await res?.json();
};

export const getIndividualProject = async (simulation) => {
  const res = await fetch(`${INDIVIDUAL_PROJECT}${simulation}.json`);
  return await res?.json();
};
