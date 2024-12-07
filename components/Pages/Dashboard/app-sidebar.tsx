import * as React from "react"
/* import { GalleryVerticalEnd } from "lucide-react"

import { NavMain } from "@/components/pages/Dashboard/Sidebar/nav-main" */
import { SidebarOptInForm } from "@/components/Pages/Dashboard/Sidebar/sidebar-opt-in-form"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { HelpNotice } from "@/components/Pages/Dashboard/Sidebar/help-notice"
import { InputSection } from "@/components/Pages/Dashboard/Sidebar/InputSect"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <VisuallyHidden>
        <h1>App Sidebar Navigation</h1>
      </VisuallyHidden>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <span className="ubuntu-mono-bold"> INPUTS </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="pl-2">
          <InputSection />
        </div>
      </SidebarContent>
      <SidebarFooter>
      <div className="p-1">
          <HelpNotice />
        </div>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
    >
      {children}
    </span>
  );
};

export default VisuallyHidden;
