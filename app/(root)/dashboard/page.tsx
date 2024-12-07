"use client";

import dynamic from "next/dynamic";
import { AppSidebar } from "@/components/Pages/Dashboard/app-sidebar";
import { useState } from "react";

import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const MapArea = dynamic(() => import("@/components/Pages/Dashboard/mapArea"), { ssr: false });

const Dashboard: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <div className="pt-20 flex h-screen">
            <SidebarProvider>
                {/* Sidebar */}
                {isSidebarVisible && (
                    <AppSidebar
                        className="border-r border-gray-500/[.25] sidebar"
                        style={{
                            height: "calc(100vh - 5rem)",
                            top: "4.5rem",
                            flexShrink: 0,
                            width: "15.5rem",
                        }}
                    />
                )}
                {/* Main Content Area */}
                <div
                    className={`flex-1 flex flex-col ${
                        isSidebarVisible ? "ml-0" : "ml-[0rem]"
                    } transition-all duration-300`}
                >
                    {/* Sidebar Trigger */}
                    <div className=" top-4 left-4 z-[1000]">
                        <SidebarTrigger
                            className="p-2 rounded-md shadow-lg bg-transparent border border-gray-300"
                            onClick={toggleSidebar}
                        >
                            {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
                        </SidebarTrigger>
                    </div>
                    {/* Map Area */}
                    <div className="relative flex-1 ">
                        <MapArea />
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );
};
export default Dashboard;