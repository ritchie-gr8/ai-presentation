import { containeVariants } from "@/lib/constants";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import ProjectCard from "../project-card";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containeVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, idx) => (
        <ProjectCard
          key={idx}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDeleted={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
