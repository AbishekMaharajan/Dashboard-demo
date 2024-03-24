import { BASE_URL } from "../firebase";

const SCOREBOARD_LIST_URL =`${BASE_URL}/users/ysHotel/staffsScoreList.json`;

export const getScoreBoardList = async () => {
  const res = await fetch(SCOREBOARD_LIST_URL);
  return await res?.json();
};
