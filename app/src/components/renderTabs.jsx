import React, { useContext } from "react";
import { activeTabContext } from "../context/contextDefine";
import Home from "./mainTabs/home";
import SpeedTest from "./mainTabs/speedTest";
import Settings from "./mainTabs/Settings";
import Upgrade from "./mainTabs/upgrade";
import Feedback from "./mainTabs/feedback";
import DashBoard from "./mainTabs/dashBoard";

export default function RenderTabs() {
  const { activeTab, isLoggedIn } = useContext(activeTabContext);
  return (
    <div className=" w-full h-[100vh] overflow-y-scroll">
      {activeTab === "home" ? (
        <Home />
      ) : activeTab === "test" ? (
        <SpeedTest />
      ) : activeTab === "settings" ? (
        <Settings />
      ) : activeTab === "upgrade" ? (
        <Upgrade />
      ) : activeTab === "dash" && isLoggedIn === true ? (
        <DashBoard />
      ) : (
        <Feedback />
      )}
    </div>
  );
}
