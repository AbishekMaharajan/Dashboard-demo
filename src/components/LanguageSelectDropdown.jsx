import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const LanguageSelectDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const options = ["日本語", "English"];
  const [selectedOption, setSelectedOption] = useState("日本語");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    i18n?.changeLanguage(option === "English" ? "en" : "jp");
    setIsOpen(false);
  };

  return (
    <div className="min-h-[150px] w-full max-w-xs">
      <div
        className="flex items-center justify-between w-full p-3 cursor-pointer bg-neutral-300"
        onClick={toggleDropdown}
      >
        <div className="font-semibold">{selectedOption}</div>
        <BiChevronDown fontSize="1.5em" />
      </div>
      {isOpen && (
        <div className="w-full bg-[#b4b4b4]">
          {options.map((option) => (
            <div
              key={option}
              className="p-3 font-semibold cursor-pointer hover:bg-neutral-400/75"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelectDropdown;
