"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

const createResponse = (status: number, data?: any, error?: string) => {
  if (error) {
    return { status, error };
  }
  return { status, data };
};

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return createResponse(404, null, "No projects found");
    }

    return createResponse(200, projects);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return createResponse(404, null, "No recent projects available");
    }

    return createResponse(200, projects);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!updatedProject) {
      return createResponse(500, null, "Failed to recover project");
    }

    return createResponse(200, updatedProject);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!updatedProject) {
      return createResponse(500, null, "Failed to delete project");
    }

    return createResponse(200, updatedProject);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return createResponse(400, null, "Title and outlines are required");
    }

    const allOutlines = outlines.map((outline) => outline.title);

    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user?.id,
      },
    });

    if (!project) {
      return createResponse(500, null, "Failed to create project");
    }

    return createResponse(200, project);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return createResponse(404, null, "Project not found");
    }

    return createResponse(200, project);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return createResponse(400, null, "Project ID and slides are required.");
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });

    if (!updatedProject) {
      return createResponse(500, null, "Failed to update slides.");
    }

    return createResponse(200, updatedProject);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return createResponse(400, null, "Project ID and Theme are required.");
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });

    if (!updatedProject) {
      return createResponse(500, null, "Failed to update theme");
    }

    return createResponse(200, updatedProject);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const deleteAllProjects = async (projectIds: string[]) => {
  try {
    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return createResponse(400, null, "No project IDs provided.");
    }

    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const userId = checkUser.user.id;

    const projectsToDelete = await client.project.findMany({
      where: {
        id: {
          in: projectIds,
        },
        userId: userId,
      },
    });

    if (projectsToDelete.length === 0) {
      return createResponse(404, null, "No projects found for the given IDs.");
    }

    const deletedProjects = await client.project.deleteMany({
      where: {
        id: {
          in: projectsToDelete.map((project) => project.id),
        },
      },
    });

    return createResponse(200, {
      message: `${deletedProjects.count} projects have been deleted successfully.`,
    });
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};

export const getDeletedProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return createResponse(403, null, "User not authenticated");
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects?.length === 0) {
      return createResponse(400, null, "No deleted projects found.");
    }

    return createResponse(200, projects);
  } catch (error) {
    console.error("🔴 ERROR", error);
    return createResponse(500, null, "Internal server error");
  }
};
