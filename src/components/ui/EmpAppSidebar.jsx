// src/components/ui/AppSidebar.jsx
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "../../assets/logo.svg";

const items = [
  { title: "Home", url: "/empdashboard" },
  { title: "Tasks", url: "/emptasks" },
  { title: "Profile", url: "#" },
];

export function EmpAppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader className="flex items-center justify-center p-4 border-b">
        <img
          src={logo} // put your logo image in /public/logo.png
          alt="Logo"
          className="h-10 w-auto"
        />
        {/* Or text-based */}
        {/* <h1 className="text-xl font-bold">Incture .</h1> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      {/* <item.icon className="w-4 h-4" /> */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
