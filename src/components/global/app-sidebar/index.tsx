"use client";
import { Avatar } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

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
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open] :text-sidebar-accent-foreground"
        >
          <div
            className="flex aspect-square size-8 items-center
            justify-center rounded-lg text-sidebar-primary"
          >
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/favicon.ico" alt="icon" />
              <AvatarFallback className="rounded-lg">VI</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            AI PPT
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
