const SCOREBOARD_LIST_URL =
  "https://restaurant-communication-default-rtdb.asia-southeast1.firebasedatabase.app/users/ysHotel/staffsScoreList.json";

export const getScoreBoardList = async () => {
  const res = await fetch(SCOREBOARD_LIST_URL);
  return res?.json();
};
