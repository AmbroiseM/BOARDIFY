import React from "react";
import Layout from "./Layout";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import DashBoard from "../components/Dashboard/Dashboard";

function Main() {
  return (
    <Layout>
      <ProjectCard />
      <DashBoard />
    </Layout>
  );
}

export default Main;
