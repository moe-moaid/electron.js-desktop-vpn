import React, { useContext } from "react";
import { activeTabContext } from "../context/contextDefine";

export default function SingleServer(props) {
  const { id, country, city, type, flag } = props;
  const { activeServer, setActiveServer } = useContext(activeTabContext);
  function handleClick() {
    setActiveServer(activeServer === id ? null : id);
  }

  const isActive = id === activeServer;

  return (
    <>
      <button
        className={`flex flex-row justify-between items-center px-1 mx-1 py-2 w-full hover:bg-[#121B32] hover:outline-none hover:ring-1 hover:ring-[#F0A927] ${
          isActive ? "bg-[#121B32] outline-none ring-1 ring-[#F0A927]" : ""
        } rounded-md`}
        onClick={handleClick}
      >
        <div className="flex flex-row justify-start items-center">
          <img
            className="w-[40px] h-[40px] rounded-full"
            src={`https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@master/png100px/${flag}.png`}
            alt={`${country} flag`}
          />
          <div className="text-start ms-4">
            <p className=" text-[#F5F5F5] font-semibold text-[20px]">
              {country}
            </p>
            <p className="text-[#f5f5f58f] font-semibold text-[14px]">
              {city}
            </p>
          </div>
        </div>
        <p className="text-[#F5F5F5] font-semibold text-[20px]">
          {type === "free" ? (
            type
          ) : (
            <svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.21937 9.9648C0.8829 7.60951 0.546435 5.25428 0.209969 2.89899C0.135352 2.37689 0.686983 2.02079 1.07937 2.33775C2.12765 3.18444 3.17588 4.03107 4.22416 4.87776C4.56931 5.15653 5.06104 5.06581 5.30032 4.67922L7.91842 0.449946C8.1951 0.00301283 8.80486 0.00301283 9.08153 0.449946L11.6996 4.67922C11.9389 5.06581 12.4306 5.15647 12.7758 4.87776C13.8241 4.03107 14.8723 3.18444 15.9206 2.33775C16.313 2.02079 16.8646 2.37689 16.79 2.89899C16.4536 5.25428 16.1171 7.60951 15.7806 9.9648H1.21937Z"
                fill="#FF9500"
              />
              <path
                d="M15.0218 13.8852H1.97889C1.55962 13.8852 1.21973 13.5192 1.21973 13.0677V11.2717H15.781V13.0677C15.781 13.5192 15.4411 13.8852 15.0218 13.8852Z"
                fill="#FF9500"
              />
            </svg>
          )}
        </p>
      </button>
    </>
  );
}