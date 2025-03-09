"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";
import { PenTool } from "lucide-react";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & {
  user: User;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[224px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open] :text-sidebar-accent-foreground"
        >
          <div className="bg-primary p-2 rounded-md">
            <PenTool className="size-5 text-primary-foreground" />
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            SlideSage
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
