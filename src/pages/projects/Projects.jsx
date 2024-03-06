import { Route, Routes } from "react-router-dom";
import Records from "./Records";
import CreateProjects from "./createProjects/CreateProjects";
import WelcomePage from "./createProjects/WelcomePage";
import ProjectFormPage from "./createProjects/ProjectFormPage";

const Projects = () => {
  return (
    <div className="w-screen h-screen p-5">
      <Routes>
        <Route index element={<Records />} />
        {["create", "update"].map((route) => (
          <Route path={route} key={route} element={<CreateProjects />}>
            <Route index element={<WelcomePage />} />
            <Route path=":id" element={<ProjectFormPage />} />
          </Route>
        ))}
      </Routes>
    </div>
  );
};

export default Projects;
