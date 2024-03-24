import { BASE_URL } from "../firebase";

const PROJECTS_LIST_URL = `${BASE_URL}/users/ysHotel/dataList/liveList.json`;
const INDIVIDUAL_PROJECT = `${BASE_URL}/users/ysHotel/simulationlist/live/`;

export const getProjectsList = async () => {
  const res = await fetch(PROJECTS_LIST_URL);
  return await res?.json();
};

export const getIndividualProject = async (simulation) => {
  const res = await fetch(`${INDIVIDUAL_PROJECT}${simulation}.json`);
  return await res?.json();
};
