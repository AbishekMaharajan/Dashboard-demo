/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const initialValues = {
  stepData: [],
  modalIsOpen: false,
};

const ProjectsContext = createContext(initialValues);

const ProjectsProvider = ({ children }) => {
  const [stepData, setStepData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const value = {
    stepData,
    setStepData,
    modalIsOpen,
    setModalIsOpen,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => useContext(ProjectsContext);

export { ProjectsProvider, useProjects };
