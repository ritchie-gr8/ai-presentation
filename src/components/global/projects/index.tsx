import { Project } from "@prisma/client";
import React from "react";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return <div>Projects</div>;
};

export default Projects;
