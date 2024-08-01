import React, { useState } from "react";
import Checkbox from "../checkbox";
import { useTranslation } from "react-i18next";

export default function Feedback() {
  const [issues, setIssues] = useState([]);
  const [text, setText] = useState("");
  const [renderInput, setRenderInput] = useState(false);
  const { t } = useTranslation();

  function handleIssuesClick(issue) {
    setIssues((prevIssues) => {
      if (prevIssues.includes(issue)) {
        return prevIssues.filter((prevIssues) => prevIssues !== issue);
      } else {
        return [...prevIssues, issue];
      }
    });
  }

  function handleMessage(message) {
    if (message.length <= 500) {
      setText(message);
    } else return;
  }

  function showInput(value) {
    setRenderInput(value);
  }
  return (
    <div className="relative bg-darkblue w-full min-h-screen pb-5 overflow-y-scroll">
      <h1 className="pt-20 ps-20 text-white text-[24px] font-bold">
        {t("Feedback")}
      </h1>
      <div className="mt-20 ms-24">
        <p className="text-white text-[18px] font-medium">
          {" "}
          {t("What is your feedback about?")}
        </p>
        <div className="flex flex-row flex-wrap items-center mt-10">
          <p
            onClick={() => handleIssuesClick("Connectivity issue")}
            className={`text-[#B0BAC3] text-[14px] font-normal ${
              issues.includes("Connectivity issue")
                ? "bg-[#48516B]"
                : "bg-[#121B32]"
            } hover:cursor-pointer rounded-full py-2 px-1 me-2`}
          >
            {t("Connectivity issue")}
          </p>
          <p
            onClick={() => handleIssuesClick("Location missing")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("Location missing")
                ? "bg-[#48516B]"
                : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t("Location missing")}
          </p>
          <p
            onClick={() => handleIssuesClick("Too much Ads")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("Too much Ads") ? "bg-[#48516B]" : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t("Too much Ads")}
          </p>
          <p
            onClick={() => handleIssuesClick("In-app Purchase issue")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("In-app Purchase issue")
                ? "bg-[#48516B]"
                : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t('In-app purchase issue')}
          </p>
          <p
            onClick={() => handleIssuesClick("App crashes")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("App crashes") ? "bg-[#48516B]" : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t("App crashes")}
          </p>
          <p
            onClick={() => handleIssuesClick("New protocols")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("New protocols") ? "bg-[#48516B]" : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t("New protocols")}
          </p>
          <p
            onClick={() => handleIssuesClick("Other")}
            className={`text-[#B0BAC3] text-[14px] font-normal bg-[#121B32] rounded-full py-2 px-1 me-2 ${
              issues.includes("Other") ? "bg-[#48516B]" : "bg-[#121B32]"
            } hover:cursor-pointer`}
          >
            {t("Other")}
          </p>
        </div>
        {/* suggession box */}
        <div className="flex flex-col pe-20 mt-10">
          <p className="text-[18px] text-white font-medium">
            {t("Your Suggestion")}
          </p>
          <textarea
            className="bg-transparent border-2 border-[#798199] text-[#B9BBBD] outline-none stroke-none rounded-md w-full mt-5 resize-none p-2"
            value={text}
            name=""
            id=""
            cols="100"
            rows="7"
            onChange={(e) => {
              handleMessage(e.target.value);
            }}
          ></textarea>
          <p className="ms-auto mt-1 text-[16px] text-[#989898]">
            {text.length}/500
          </p>
          <div className="flex flex-row justify-start items-center">
            <Checkbox isChecked={showInput} />
            <p className="text-[#F5F5F5] text-[16px]">
              {t(
                "I'd like the private VPN service to get in touch with me about my feedback."
              )}
            </p>
          </div>
          {renderInput && (
            <input
              className="border-2 border-[#48516B] bg-transparent rounded-md p-2 mt-5 w-[300px] stroke-none outline-none text-[#FFFFFF99]"
              placeholder={t("Your Email")}
              type="text"
            />
          )}
        </div>
        <button className="bg-[#F0A927] px-10 py-3 mt-10 rounded-full text-[#0B101D] font-semibold">
          {t("Submit")}
        </button>
      </div>
    </div>
  );
}
