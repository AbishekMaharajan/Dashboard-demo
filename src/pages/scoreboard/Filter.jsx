/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const header = [
  "名前",
  "変更日",
  "サイズ",
  "結果",
  "トータルスコア",
  "ボリュームスコア",
  "スピードスコア",
  "ヘッドトラッキング・スコア",
  "ボイススコア",
  "レコーディング",
];

const Filter = ({ userName, module, filters, setFilters, data }) => {
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
  };

  const downloadExcel = () => {
    const DATA = [header];
    data.forEach((el) => {
      DATA.push(Object.values(el));
    });
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(DATA);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer]);
    saveAs(blob, "Scoreboard.xlsx");
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="flex items-center gap-2 mb-6"
    >
      <select
        name="name"
        id="name"
        className="w-24 p-1 overflow-hidden bg-[#f5f5f7] rounded-lg cursor-pointer focus:outline-none"
        value={filters?.name}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, name: e.target.value }))
        }
      >
        <option value="">すべて</option>
        {userName?.map((user) => (
          <option value={user} key={user}>
            {user}
          </option>
        ))}
      </select>

      <select
        name="date"
        id="date"
        className="w-24 p-1 overflow-hidden bg-[#f5f5f7] rounded-lg cursor-pointer focus:outline-none"
        value={filters?.date}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, date: e.target.value }))
        }
      >
        <option value="">すべて</option>
        <option value="this week">今週</option>
        <option value="last week">先週</option>
        <option value="this month">今月</option>
        <option value="last month">先月</option>
      </select>

      <select
        name="module"
        id="module"
        className="w-24 p-1 overflow-hidden bg-[#f5f5f7] rounded-lg cursor-pointer focus:outline-none"
        value={filters?.module}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, module: e.target.value }))
        }
      >
        <option value="">すべて</option>
        {module.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>

      <select
        name="result"
        id="result"
        className="w-24 p-1 overflow-hidden bg-[#f5f5f7] rounded-lg cursor-pointer focus:outline-none"
        value={filters?.result}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, result: e.target.value }))
        }
      >
        <option value="">すべて</option>
        <option value="1">合格</option>
        <option value="0">不合格</option>
      </select>
      <button
        className="flex items-center justify-center gap-2 p-2 px-4 text-white transition bg-black text-nowrap ms-auto disabled:bg-black/50"
        onClick={downloadExcel}
        disabled={!data.length}
      >
        <FiDownload />
        <span className="text-xs font-semibold">.xlsx</span>
      </button>
    </motion.div>
  );
};

export default Filter;
