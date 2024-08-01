import React, { useContext } from "react";
import { activeTabContext } from "../../context/contextDefine";
import RenderSettings from "../renderSettings";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { activeSetting, setActiveSetting } = useContext(activeTabContext);
  const { t } = useTranslation();
  function handleClick(setting) {
    setActiveSetting(activeSetting === setting ? "general" : setting);
  }

  return (
    <div className="relative bg-darkblue w-full min-h-screen">
      <h1 className="text-white font-semibold text-[20px] pt-20 ps-20">
        {t('Settings')}
      </h1>
      <div className="flex flex-row justify-between w-[60%] lg:w-[50%] ps-20 pt-10">
        <button
          className={`bg-transparent ${
            activeSetting === "general" ? "text-white" : "text-[#97999D]"
          } hover:text-white text-[20px] font-semibold outline-none stroke-none border-none`}
          onClick={() => {
            handleClick("general");
          }}
        >
          {t('General')}
        </button>
        <button
          className={`bg-transparent ${
            activeSetting === "protocol" ? "text-white" : "text-[#97999D]"
          } hover:text-white text-[20px] font-semibold outline-none stroke-none border-none`}
          onClick={() => {
            handleClick("protocol");
          }}
        >
          {t('Protocol')}
        </button>
        <button
          className={`bg-transparent ${
            activeSetting === "about" ? "text-white" : "text-[#97999D]"
          } hover:text-white text-[20px] font-semibold outline-none stroke-none border-none`}
          onClick={() => {
            handleClick("about");
          }}
        >
          {t('About us')}
        </button>
      </div>
      <RenderSettings />
    </div>
  );
}
