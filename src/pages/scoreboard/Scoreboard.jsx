import Table from "./Table";
import Header from "./Header";
import Filter from "./Filter";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getScoreBoardList } from "../../service";

const Scoreboard = () => {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState([]);
  const [module, setModule] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    module: "",
    result: "",
  });

  const { data: scoreBoardList } = useQuery(
    "scoreBoardList",
    getScoreBoardList
  );

  useEffect(() => {
    if (scoreBoardList) {
      const result = scoreBoardList
        ?.reduce((acc, item) => [item].concat(acc), [])
        .map((el) => {
          const val = el.split("_");
          return {
            name: val[0],
            date: val[1],
            module: val[3],
            result: val[4],
            totalScore: val[5],
            volumeScore: val[6],
            speedScore: val[7],
            headTrackingScore: val[8],
            voiceScore: val[9],
            video: val[10],
          };
        });

      const name = [...new Set(result?.map((user) => user.name))];
      const module = [...new Set(result?.map((user) => user.module))];

      setData(result);
      setUserName(name);
      setModule(module);
    }
  }, [scoreBoardList]);

  return (
    <div className="w-full h-full p-5">
      <Header title="スコアボード" />
      <Filter
        userName={userName}
        module={module}
        filters={filters}
        setFilters={setFilters}
        data={data}
      />
      <Table data={data} filters={filters} scoreBoardList={scoreBoardList} />
    </div>
  );
};

export default Scoreboard;
