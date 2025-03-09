"use client";
import { deleteAllProjects } from "@/actions/projects";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  projects: Project[];
};

const DeleteAllButton = ({ projects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    if (!projects || projects.length === 0) {
      toast.error("Error", {
        description: "No projects found",
      });
      setOpen(false)
      return;
    }

    setLoading(true);
    try {
      const res = await deleteAllProjects(
        projects.map((project) => project.id)
      );

      if (res.status !== 200) {
        throw new Error("Failed to delete all projects.");
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete all project",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers."
      className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size={"lg"}
        className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
      >
        <Trash />
        Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
